const { app, BrowserWindow, shell, protocol, net, session } = require('electron');
const path = require('path');
const { pathToFileURL } = require('url');

// A página é servida em app://trio-pro/ (origem "real") para os vídeos do YouTube incorporados funcionarem
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }]);

function create() {
  const win = new BrowserWindow({
    width: 1200, height: 820, autoHideMenuBar: true, title: 'Trio Pro',
    webPreferences: { webviewTag: true, contextIsolation: true, nodeIntegration: false }
  });
  win.loadURL('app://trio-pro/index.html');
  // Links do YouTube abrem numa janela da própria app; o resto (ex.: fontes) abre no browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)) {
      return { action: 'allow', overrideBrowserWindowOptions: { autoHideMenuBar: true, width: 1100, height: 720 } };
    }
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.on('web-contents-created', (_e, contents) => {
  if (contents.getType() === 'webview') {
    contents.setWindowOpenHandler(({ url }) => {
      if (/^https?:/.test(url)) contents.loadURL(url);
      return { action: 'deny' };
    });
  }
});

app.whenReady().then(() => {
  protocol.handle('app', (req) => {
    const rel = decodeURIComponent(new URL(req.url).pathname).replace(/^\/+/, '') || 'index.html';
    const file = path.normalize(path.join(__dirname, rel));
    if (!file.startsWith(__dirname)) return new Response('Not found', { status: 404 });
    return net.fetch(pathToFileURL(file).toString());
  });
  // O YouTube exige um Referer válido nos vídeos incorporados (evita o "Erro 153")
  session.defaultSession.webRequest.onBeforeSendHeaders(
    { urls: ['*://*.youtube-nocookie.com/*', '*://*.youtube.com/*'] },
    (d, cb) => {
      if (!d.requestHeaders['Referer'] || d.requestHeaders['Referer'].startsWith('app:')) d.requestHeaders['Referer'] = 'https://trio-pro.app/';
      cb({ requestHeaders: d.requestHeaders });
    }
  );
  create();
});
app.on('window-all-closed', () => app.quit());

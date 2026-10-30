# Trio Pro

Guia de Fortnite por função (Fragger, IGL e Suporte), com vídeos incorporados, em 5 idiomas, mais uma app para Windows.

- Site: **https://outofofficedevteam.github.io/comptrainingfortnite/**
- Link curto: **https://tinyurl.com/comptrainingfortnite**
- App Windows: **https://github.com/outofofficedevteam/comptrainingfortnite/releases/latest/download/TrioPro-Windows.zip**

## Como está publicado

- **Site:** GitHub Pages a partir da branch `main`, pasta `/ (root)` (Settings → Pages). Cada commit na `main` atualiza o site em 1 a 2 minutos. O `.nojekyll` faz o GitHub servir os ficheiros tal como estão.
- **App Windows:** o `TrioPro-Windows.zip` (~110 MB) vai só para as Releases, nunca para o git (limite de 100 MB por ficheiro; o `.gitignore` exclui-o). Versão atual: release `v1.0.0`, «Trio Pro 1.0.0». O botão de download do site monta o link sozinho a partir do endereço e aponta sempre para a release mais recente.
- **Link curto:** TinyURL `comptrainingfortnite` → `https://outofofficedevteam.github.io/comptrainingfortnite/`. No plano gratuito o destino não se pode mudar, por isso o endereço do site tem de ficar igual.

O site do Out of Office (`outofofficedevteam.github.io`) não é afetado: é outro repositório.

## Publicar uma versão nova da app Windows

1. Abre https://github.com/outofofficedevteam/comptrainingfortnite/releases/new
2. Tag nova (ex.: `v1.1.0`) e título (ex.: `Trio Pro 1.1.0`).
3. Anexa o ficheiro com o nome exatamente **`TrioPro-Windows.zip`**.
4. Clica em **Publish release**. O link de download passa a dar a versão nova sem mudar nada no site.

## Alterar vídeos ou dicas

Tudo está no `index.html`:
- **Dicas e textos**: objeto `L` (um bloco por idioma).
- **Vídeos**: objeto `VID`, pela mesma ordem das dicas de cada função. Cada entrada é `["ID_do_vídeo", "Título"]`; o ID é o código depois de `watch?v=` no link do YouTube.

## Reconstruir a app Windows

A pasta `app-windows` tem o código da app (Electron). Num PC com Node.js instalado:

```
cd app-windows
copy ..\index.html .
npm install --save-dev electron@33.2.1
npx @electron/packager . "Trio Pro" --platform=win32 --arch=x64 --out=dist --overwrite --ignore=node_modules
```

A app fica em `dist\Trio Pro-win32-x64`. Comprime essa pasta como `TrioPro-Windows.zip` e publica-a numa release nova (ver «Publicar uma versão nova da app Windows»).

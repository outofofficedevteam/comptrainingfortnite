# Trio Pro

Guia de Fortnite por função (Fragger, IGL e Suporte), com vídeos incorporados, em 5 idiomas, mais uma app para Windows.

Site: **https://outofofficedevteam.github.io/comptrainingfortnite/**
Link curto: **https://tinyurl.com/comptrainingfortnite** (a criar depois de o site estar online)

## Publicar o site

1. Na conta `outofofficedevteam`, cria um repositório **público** chamado `comptrainingfortnite`, sem README.
2. Clica em **uploading an existing file**, arrasta o conteúdo desta pasta (`index.html`, `.nojekyll`, `README.md` e a pasta `app-windows`) e faz *Commit changes*.
3. Em **Settings → Pages**, em *Source* escolhe **Deploy from a branch**, branch `main`, pasta `/ (root)`, e guarda.
4. Ao fim de 1 a 2 minutos o site fica em https://outofofficedevteam.github.io/comptrainingfortnite/

O site do Out of Office não é afetado: é outro repositório. Em repositórios públicos o GitHub Actions é gratuito e sem limite, por isso a publicação não gasta minutos.

## Publicar a app Windows

1. No repositório `comptrainingfortnite`, abre **Releases → Create a new release**.
2. Tag: `v1.0.0`. Título: `Trio Pro 1.0.0`.
3. Anexa o ficheiro **`TrioPro-Windows.zip`** (o nome tem de ser exatamente este).
4. Clica em **Publish release**.

O botão de download do site aponta sozinho para
https://github.com/outofofficedevteam/comptrainingfortnite/releases/latest/download/TrioPro-Windows.zip
Em versões novas, cria outra release com o mesmo nome de ficheiro.

## Criar o link curto

1. Abre o site e confirma que funciona.
2. Em https://tinyurl.com, cola `https://outofofficedevteam.github.io/comptrainingfortnite/` e, em *Customize your link*, escreve `comptrainingfortnite`.
3. Cria o link. No plano gratuito o destino não pode ser alterado depois, por isso confirma o endereço antes.

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

A app fica em `dist\Trio Pro-win32-x64`. Comprime essa pasta como `TrioPro-Windows.zip` e publica-a numa release nova.

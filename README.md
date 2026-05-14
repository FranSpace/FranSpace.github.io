# Personal Site

## Local preview

```bash
npm run dev
```

Open the local address shown in the terminal, usually:

```text
http://localhost:5173/
```

## Production preview

```bash
npm run build
npm run preview
```

## Repo retention rules

### Must keep

These files and directories are part of the real source of truth for the site:

- `src/` for the React app, routes, layout, and styles
- `content/latex-notes/` for note metadata and Markdown content
- `public/generated-notes/` for note PDFs exposed by the site
- `.github/workflows/deploy.yml` for GitHub Pages deployment
- `package.json` and `package-lock.json` for dependency management
- `index.html` and `vite.config.js` for the Vite app shell and build config

### Recommended keep

These are legitimate project assets and should stay in the repo unless they are moved to a better location:

- `Profile picture.png` for the site avatar
- `QRCode.jpg` for the WeChat QR code
- `README.md` for maintenance notes and repo rules

### Do not version

These are local or generated artifacts and should not be committed:

- `node_modules/`
- `dist/`
- `.codex/`
- `desktop.ini`
- local debug logs

### Old leftovers that can be deleted locally

These do not participate in the current site build:

- `content/notes/` old empty note folders
- `scripts/` if kept empty
- `src/generated/` if recreated as an empty folder in the future

## Content maintenance

General site copy and page data live in:

- `src/siteData.js`
- `src/styles.css`

LaTeX-driven notes use a separate content layer:

- `content/latex-notes/<slug>/meta.json`
- `content/latex-notes/<slug>/content.md`

The site auto-loads every note under `content/latex-notes`.

## Notes workflow

Recommended long-term workflow:

1. Keep LaTeX as the source of truth.
2. Convert one note into repo-ready Markdown.
3. Save the result into `content/latex-notes/<slug>/`.
4. Copy the corresponding PDF into `public/generated-notes/<slug>/source.pdf`.
5. Run `npm run build` to verify the note renders correctly.

## GitHub Pages

This repo deploys through GitHub Actions. The workflow installs dependencies, runs `npm run build`, and publishes the generated `dist/` artifact automatically, so `dist/` does not need to stay in git.

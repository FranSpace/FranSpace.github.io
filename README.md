# Personal Site Starter

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

## Content maintenance

General site copy and page data still live in:

- `src/siteData.js`
- `src/styles.css`

LaTeX-driven notes now use a separate content layer:

- `content/latex-notes/<slug>/meta.json`
- `content/latex-notes/<slug>/content.md`

The site auto-loads every note under `content/latex-notes`.

## LaTeX to Markdown workflow

This repo now includes a project skill for note conversion:

- `.codex/skills/latex-notes-to-md/SKILL.md`

Recommended long-term workflow:

1. Keep LaTeX as the source of truth.
2. Use the skill to convert one note into repo-ready Markdown.
3. Save the result into `content/latex-notes/<slug>/`.
4. Run `npm run build` to verify the note renders correctly.

## GitHub Pages

If the repository name is `<username>.github.io`, keep:

```js
base: "/"
```

If the repository name is a normal repository such as `my-site`, update `vite.config.js`:

```js
base: "/my-site/"
```

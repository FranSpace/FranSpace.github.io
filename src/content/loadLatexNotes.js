const metaModules = import.meta.glob("../../content/latex-notes/*/meta.json", {
  eager: true,
  import: "default",
});

const markdownModules = import.meta.glob(
  "../../content/latex-notes/*/content.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  },
);

function extractSlug(path) {
  const segments = path.split("/");
  return segments[segments.length - 2];
}

function buildNote(meta, markdown, slug) {
  return {
    ...meta,
    slug: meta.slug || slug,
    content: {
      ...meta.content,
      summary: meta.summary || meta.content?.summary || "",
      markdown: markdown || "",
      pdfHref: meta.pdfHref || meta.content?.pdfHref || "",
    },
  };
}

export const latexNotes = Object.entries(metaModules)
  .map(([metaPath, meta]) => {
    const slug = extractSlug(metaPath);
    const markdownPath = metaPath.replace(/meta\.json$/, "content.md");
    const markdown = markdownModules[markdownPath];
    return buildNote(meta, markdown, slug);
  })
  .sort((left, right) => {
    const orderDiff = (left.order ?? 999) - (right.order ?? 999);
    if (orderDiff !== 0) return orderDiff;
    return left.title.localeCompare(right.title, "zh-Hans-CN");
  });

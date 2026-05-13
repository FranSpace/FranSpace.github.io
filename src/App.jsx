import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./styles.css";
import { siteData } from "./siteData";
import { latexNotes } from "./content/loadLatexNotes";
import profileImage from "../Profile picture.png";
import qrCodeImage from "../QRCode.jpg";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

const FEATURED_NOTES_STORAGE_KEY = "franspace-featured-notes";

export default function App() {
  const location = useLocation();
  const noteCollections = buildNoteCollections(
    siteData.noteCollections ?? [],
    latexNotes,
  );
  const topLevelNotes = [...noteCollections, ...siteData.notes];
  const [featuredNoteSlugs, setFeaturedNoteSlugs] = useState(() =>
    loadFeaturedNoteSlugs(topLevelNotes),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      FEATURED_NOTES_STORAGE_KEY,
      JSON.stringify(featuredNoteSlugs),
    );
  }, [featuredNoteSlugs]);

  const appData = {
    ...siteData,
    metrics: siteData.metrics.map((item) =>
      item.label === "Notes"
        ? {
            ...item,
            value: String(topLevelNotes.length).padStart(2, "0"),
          }
        : item,
    ),
    noteCollections: noteCollections.map((note) => ({
      ...note,
      featuredOnHome: featuredNoteSlugs.includes(note.slug),
    })),
    noteEntries: latexNotes,
    notes: topLevelNotes.map((note) => ({
      ...note,
      featuredOnHome: featuredNoteSlugs.includes(note.slug),
    })),
  };

  const toggleFeaturedNote = (slug) => {
    setFeaturedNoteSlugs((current) =>
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug],
    );
  };

  return (
    <div className="site-shell">
      <BackgroundTexture />
      <Header profile={appData.profile} nav={appData.nav} />
      <SiteEffects data={appData} />
      <main
        className={`page-shell ${
          location.pathname === "/" ? "page-shell--home" : "page-shell--wide"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage data={appData} />} />
          <Route path="/about" element={<AboutPage data={appData} />} />
          <Route path="/notes" element={<NotesPage data={appData} />} />
          <Route
            path="/notes/:slug"
            element={
              <NoteDetailPage
                data={appData}
                onToggleFeatured={toggleFeaturedNote}
              />
            }
          />
          <Route
            path="/notes/:slug/:entrySlug"
            element={<NoteEntryDetailPage data={appData} />}
          />
          <Route path="/research" element={<ResearchPage data={appData} />} />
          <Route
            path="/research/:slug"
            element={<ResearchDetailPage data={appData} />}
          />
          <Route path="/projects" element={<ProjectsPage data={appData} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetailPage data={appData} />}
          />
          <Route
            path="/resources"
            element={<ResourcesPage data={appData} />}
          />
          <Route
            path="/resources/:slug"
            element={<ResourceDetailPage data={appData} />}
          />
          <Route path="/journal" element={<JournalPage data={appData} />} />
          <Route
            path="/journal/:slug"
            element={<JournalDetailPage data={appData} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function Header({ profile, nav }) {
  const location = useLocation();
  const navRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState(null);

  const pathMap = {
    Home: "/",
    Notes: "/notes",
    Research: "/research",
    Projects: "/projects",
    Resources: "/resources",
    Journal: "/journal",
  };

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const navElement = navRef.current;
      const activeItem = navElement?.querySelector(".top-nav__item.is-active");

      if (!navElement || !activeItem) {
        setIndicatorStyle(null);
        return;
      }

      setIndicatorStyle({
        width: `${activeItem.offsetWidth}px`,
        height: `${activeItem.offsetHeight}px`,
        transform: `translate(${activeItem.offsetLeft}px, ${activeItem.offsetTop}px)`,
        opacity: 1,
      });
    };

    updateIndicator();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => updateIndicator())
        : null;

    if (resizeObserver && navRef.current) {
      resizeObserver.observe(navRef.current);
    }

    window.addEventListener("resize", updateIndicator);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateIndicator);
    };
  }, [location.pathname, nav]);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <div className="brand__mark">
            <img
              className="brand__avatar"
              src={profileImage}
              alt={`${profile.name} profile`}
            />
          </div>
          <div className="brand__meta">
            <div className="brand__badge">{profile.badge}</div>
            <div className="brand__name">{profile.name}</div>
          </div>
        </Link>

        <nav className="top-nav" aria-label="Primary" ref={navRef}>
          <div
            className="top-nav__indicator"
            aria-hidden="true"
            style={indicatorStyle ?? undefined}
          />
          {nav.map((item) => (
            <NavLink
              key={item}
              to={pathMap[item]}
              end={item === "Home"}
              className={({ isActive }) =>
                `top-nav__item ${isActive ? "is-active" : ""}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>

        <Link className="about-link" to="/about">
          {profile.aboutLabel}
        </Link>
      </div>
    </header>
  );
}

function HomePage({ data }) {
  const { home, metrics, notes, profile } = data;
  const featuredNotes = getFeaturedNotes(notes);

  return (
    <>
      <section className="hero hero--two-column">
        <div className="hero__main hero__main--left">
          <div className="section-eyebrow">
            <span>{profile.eyebrow}</span>
            <span className="section-eyebrow__line" />
          </div>

          <h1 className="hero__title hero__title--wide">{profile.title}</h1>

          <p className="hero__intro hero__intro--en">{profile.intro}</p>
          <p className="hero__intro hero__intro--zh">{profile.introZh}</p>
        </div>

        <div className="hero__aside">
          <div className="metrics-grid metrics-grid--hero">
            {metrics.map((item) => (
              <MetricCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Overview"
          title="Selected notes"
          meta={`${featuredNotes.length} pinned topics`}
        />
        {featuredNotes.length > 0 ? (
          <div className="card-grid card-grid--3">
            {featuredNotes.map((card) => (
              <NoteCard key={card.slug} card={card} />
            ))}
          </div>
        ) : (
          <div className="soft-card soft-card--empty">
            <h3 className="card-title">No selected notes yet</h3>
            <p className="card-desc">
              Open any note detail page and use the featured button to pin it to
              the homepage.
            </p>
          </div>
        )}
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="From the archive"
          title="More paths to explore"
          meta={`${home.spotlights.length} highlights`}
        />
        <div className="card-grid card-grid--3">
          {home.spotlights.map((item) => (
            <HomeSpotlightCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      <section className="section-block section-block--last">
        <HomeFooter footer={home.footer} />
      </section>
    </>
  );
}

function NotesPage({ data }) {
  return (
    <>
      <PageHero
        eyebrow="Knowledge base"
        title="Notes"
        desc="Structured notes across mechanics, numerical methods, implementation details, and working ideas."
        meta={`${data.notes.length} topics`}
      />
      <section className="section-block section-block--topless">
        <div className="card-grid card-grid--3">
          {data.notes.map((card) => (
            <NoteCard key={card.slug} card={card} />
          ))}
        </div>
      </section>
    </>
  );
}

function AboutPage({ data }) {
  const { about } = data;

  return (
    <>
      <PageHero
        eyebrow="Context and intent"
        title="About"
        desc={about.heroDesc}
        meta={about.meta}
      />

      <section className="section-block section-block--topless">
        <div className="about-layout">
          <div className="about-prose">
            <p className="about-prose__lead">{about.summary}</p>
            <p className="about-prose__zh">{about.summaryZh}</p>
          </div>

          <div className="metrics-grid metrics-grid--hero">
            {about.highlights.map((item) => (
              <MetricCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <SectionHeading
          eyebrow="Structure"
          title="How the archive is organized"
          meta={`${about.blocks.length} sections`}
        />
        <div className="card-grid card-grid--3">
          {about.blocks.map((block) => (
            <article key={block.title} className="soft-card">
              <div
                className={`accent-chip accent-chip--${block.accent || "blue"}`}
              >
                {block.label}
              </div>
              <h3 className="card-title">{block.title}</h3>
              <p className="card-desc">{block.desc}</p>
              <p className="card-desc card-desc--zh">{block.descZh}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block section-block--last">
        <SectionHeading
          eyebrow="Approach"
          title="Working principles"
          meta={`${about.principles.length} principles`}
        />
        <div className="about-principles">
          {about.principles.map((item) => (
            <article key={item.title} className="about-principle">
              <div className="about-principle__label">{item.label}</div>
              <h3 className="about-principle__title">{item.title}</h3>
              <p className="about-principle__desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ResearchPage({ data }) {
  return (
    <>
      <PageHero
        eyebrow="Themes and investigations"
        title="Research"
        desc="Longer-running themes, paper trails, and technical directions worth returning to."
        meta={`${data.research.length} collections`}
      />
      <section className="section-block section-block--topless">
        <div className="card-grid card-grid--2">
          {data.research.map((card) => (
            <Link
              key={card.slug}
              to={`/research/${card.slug}`}
              className="soft-card-link"
            >
              <article className="soft-card">
                <div className="card-topline card-topline--wrap">
                  <div className="tag-row">
                    {card.tags.map((tag, idx) => (
                      <span
                        key={tag}
                        className={`tag-pill ${idx % 2 === 0 ? "tag-pill--blue" : "tag-pill--sage"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="card-meta">{card.meta}</span>
                </div>
                <h3 className="card-title card-title--large">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <p className="card-desc card-desc--zh">{card.descZh}</p>
                <div className="card-link">Explore theme ↗</div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectsPage({ data }) {
  return (
    <>
      <PageHero
        eyebrow="Implementations and experiments"
        title="Projects"
        desc="Code, validation work, prototypes, and small systems built along the way."
        meta={`${data.projects.length} projects`}
      />
      <section className="section-block section-block--topless">
        <div className="card-grid card-grid--2">
          {data.projects.map((card) => (
            <Link
              key={card.slug}
              to={`/projects/${card.slug}`}
              className="soft-card-link"
            >
              <article className="soft-card">
                <div className="card-topline">
                  <span className="card-meta">{card.index}</span>
                  <span
                    className={`status-pill status-pill--${card.statusTone || "blue"}`}
                  >
                    {card.status}
                  </span>
                </div>
                <div className="stack-label">{card.stack}</div>
                <h3 className="card-title card-title--large">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <p className="card-desc card-desc--zh">{card.descZh}</p>
                <div className="card-link">View project ↗</div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function ResourcesPage({ data }) {
  return (
    <>
      <PageHero
        eyebrow="Reusable building blocks"
        title="Resources"
        desc="Templates, setup notes, reusable references, and workflow scaffolds."
        meta={`${data.resources.length} entries`}
      />
      <section className="section-block section-block--topless">
        <div className="card-grid card-grid--3">
          {data.resources.map((card) => (
            <Link
              key={card.slug}
              to={`/resources/${card.slug}`}
              className="soft-card-link"
            >
              <article className="soft-card">
                <div
                  className={`accent-chip accent-chip--${card.accent || "blue"}`}
                >
                  {card.kind}
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <p className="card-desc card-desc--zh">{card.descZh}</p>
                <div className="card-link">Open resource ↗</div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function JournalPage({ data }) {
  return (
    <>
      <PageHero
        eyebrow="Selected writings"
        title="Journal"
        desc="Progress logs, reflections, and technical writing that sit between notes and essays."
        meta={`${data.journal.length} entries`}
      />
      <section className="section-block section-block--topless section-block--last">
        <div className="journal-list">
          {data.journal.map((entry) => (
            <Link
              key={entry.slug}
              to={`/journal/${entry.slug}`}
              className="journal-card-link"
            >
              <article className="journal-card">
                <div className="journal-card__meta">
                  <div className="journal-card__date">{entry.date}</div>
                  <div className="journal-card__cat">{entry.cat}</div>
                </div>
                <div className="journal-card__content">
                  <h3 className="card-title card-title--large">
                    {entry.title}
                  </h3>
                  <p className="card-desc">{entry.desc}</p>
                  <p className="card-desc card-desc--zh">{entry.descZh}</p>
                  <div className="card-link">Read note ↗</div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function NoteDetailPage({ data, onToggleFeatured }) {
  const item = findBySlug(data.notes);

  return (
    <DetailPage
      item={item}
      backTo="/notes"
      backLabel="Back to Notes"
      featureToggle={
        item
          ? {
              active: item.featuredOnHome,
              onToggle: () => onToggleFeatured(item.slug),
            }
          : null
      }
    />
  );
}

function NoteEntryDetailPage({ data }) {
  const { slug, entrySlug } = useParams();
  const collection = data.noteCollections.find((item) => item.slug === slug);
  const entry = collection?.entries?.find((item) => item.slug === entrySlug);

  if (!collection || !entry) {
    return <Navigate to="/notes" replace />;
  }

  return (
    <DetailPage
      item={entry}
      backTo={`/notes/${collection.slug}`}
      backLabel={`Back to ${collection.title}`}
      eyebrowLabel={collection.title}
    />
  );
}

function ResearchDetailPage({ data }) {
  return (
    <DetailPage
      item={findBySlug(data.research)}
      backTo="/research"
      backLabel="Back to Research"
    />
  );
}

function ProjectDetailPage({ data }) {
  return (
    <DetailPage
      item={findBySlug(data.projects)}
      backTo="/projects"
      backLabel="Back to Projects"
    />
  );
}

function ResourceDetailPage({ data }) {
  return (
    <DetailPage
      item={findBySlug(data.resources)}
      backTo="/resources"
      backLabel="Back to Resources"
    />
  );
}

function JournalDetailPage({ data }) {
  return (
    <DetailPage
      item={findBySlug(data.journal)}
      backTo="/journal"
      backLabel="Back to Journal"
    />
  );
}

function findBySlug(items) {
  const { slug } = useParams();
  return items.find((item) => item.slug === slug);
}

function DetailPage({
  item,
  backTo,
  backLabel,
  featureToggle,
  eyebrowLabel = "Detail page",
}) {
  if (!item) return <Navigate to={backTo} replace />;
  const hasActions = Boolean(
    featureToggle || item.content?.pdfHref || item.entries?.length,
  );

  return (
    <section className="detail-page">
      <header className="detail-page__masthead">
        <Link to={backTo} className="detail-page__back">
          ← {backLabel}
        </Link>

        <div className="section-eyebrow">
          <span>{eyebrowLabel}</span>
          <span className="section-eyebrow__line" />
        </div>
      </header>

      <div className="detail-page__reading-rail detail-page__reading-rail--title">
        <h1 className="detail-page__title">{item.title}</h1>
      </div>

        {hasActions && (
          <div className="detail-page__reading-rail">
            <div className="detail-page__actions">
              {featureToggle && (
                <button
                  type="button"
                  className={`detail-page__feature-toggle ${featureToggle.active ? "is-active" : ""}`}
                  onClick={featureToggle.onToggle}
                >
                  {featureToggle.active
                    ? "Featured on Home"
                    : "Add to Home Selection"}
                </button>
              )}
              {item.content?.pdfHref && (
                <a
                  href={item.content.pdfHref}
                target="_blank"
                rel="noreferrer"
                className="detail-page__pdf-link"
              >
                Open PDF ↗
              </a>
            )}
            <div className="detail-page__action-meta">
              {item.entries?.length ? `${item.entries.length} Notes` : "1 Note"}
            </div>
          </div>
        </div>
      )}

      {item.content?.summary && (
        <div className="detail-page__reading-rail">
          <p className="detail-page__summary">{item.content.summary}</p>
        </div>
      )}
      {item.descZh && (
        <div className="detail-page__reading-rail">
          <p className="detail-page__summary detail-page__summary--zh">
            {item.descZh}
          </p>
        </div>
      )}

      {item.entries?.length ? (
        <>
          <div className="detail-page__reading-rail">
            <div className="detail-page__body">
              {item.content?.paragraphs?.map((text) => (
                <p key={text}>{text}</p>
              ))}
            </div>
          </div>
          <NoteDirectory collection={item} />
        </>
      ) : item.content?.markdown ? (
        <div className="detail-page__reading-rail">
          <MarkdownContent markdown={item.content.markdown} />
        </div>
      ) : (
        <div className="detail-page__reading-rail">
          <div className="detail-page__body">
            {item.content?.paragraphs?.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function PageHero({ eyebrow, title, desc, meta }) {
  return (
    <section className="page-hero">
      <div>
        <div className="section-eyebrow">
          <span>{eyebrow}</span>
          <span className="section-eyebrow__line" />
        </div>
        <h2 className="page-hero__title">{title}</h2>
        <p className="page-hero__desc">{desc}</p>
      </div>
      <div className="page-hero__meta">{meta}</div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, meta }) {
  return (
    <div className="section-heading">
      <div className="section-heading__left">
        <div className="section-eyebrow">
          <span>{eyebrow}</span>
          <span className="section-eyebrow__line" />
        </div>
        <h2 className="section-heading__title">{title}</h2>
      </div>
      <div className="section-heading__meta">{meta}</div>
    </div>
  );
}

function NoteCard({ card }) {
  return (
    <Link to={card.to || `/notes/${card.slug}`} className="soft-card-link">
      <article className="soft-card">
        <div className="card-topline">
          <div className={`icon-badge icon-badge--${card.accent || "blue"}`}>
            {card.icon}
          </div>
          <div className="card-topline__meta">
            {card.featuredOnHome && (
              <span className="accent-chip accent-chip--blue">Home pinned</span>
            )}
            <span className="card-meta">{card.meta}</span>
          </div>
        </div>
        <h3 className="card-title">{card.title}</h3>
        <p className="card-desc">{card.desc}</p>
        {card.descZh && <p className="card-desc card-desc--zh">{card.descZh}</p>}
        <div className="card-link">Open topic ↗</div>
      </article>
    </Link>
  );
}

function NoteDirectory({ collection }) {
  return (
    <section className="detail-page__reading-rail note-directory">
      <div className="section-heading">
        <div className="section-heading__left">
          <div className="section-eyebrow">
            <span>Series directory</span>
            <span className="section-eyebrow__line" />
          </div>
          <h2 className="section-heading__title">Table of contents</h2>
          </div>
        </div>
        <div className="note-directory__list">
          {collection.entries.map((entry, index) => (
            <Link
              key={entry.slug}
              to={`/notes/${collection.slug}/${entry.slug}`}
              className="note-directory__item"
            >
              <div className="note-directory__index">
                {entry.icon || String(index).padStart(2, "0")}
              </div>
              <div className="note-directory__content">
                <div className="note-directory__meta">{entry.meta}</div>
              <h3 className="note-directory__title">{entry.title}</h3>
              {entry.descZh && (
                  <p className="note-directory__desc note-directory__desc--zh">
                    {entry.descZh}
                  </p>
                )}
                <div className="card-link note-directory__card-link">Open note →</div>
              </div>
            </Link>
        ))}
      </div>
      </section>
  );
}

function HomeSpotlightCard({ item }) {
  return (
    <Link to={item.to} className="soft-card-link">
      <article className="soft-card soft-card--compact">
        <div className="card-topline card-topline--wrap">
          <div className={`accent-chip accent-chip--${item.accent || "blue"}`}>
            {item.label}
          </div>
          <span className="card-meta">{item.meta}</span>
        </div>
        <h3 className="card-title">{item.title}</h3>
        <p className="card-desc">{item.desc}</p>
        <p className="card-desc card-desc--zh">{item.descZh}</p>
        <div className="card-link">{item.cta || "Explore"}</div>
      </article>
    </Link>
  );
}

function MarkdownContent({ markdown }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="detail-page__body detail-page__body--markdown">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.depth === 2) {
            return (
              <h2 key={`${block.type}-${index}`} className="markdown-heading markdown-heading--h2">
                {block.content}
              </h2>
            );
          }

          return (
            <h3 key={`${block.type}-${index}`} className="markdown-heading markdown-heading--h3">
              {block.content}
            </h3>
          );
        }

        if (block.type === "math") {
          return (
            <div key={`${block.type}-${index}`} className="markdown-math">
              {`$$\n${block.content}\n$$`}
            </div>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={`${block.type}-${index}`} className="markdown-list">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={`${block.type}-${index}`} className="markdown-list markdown-list--ordered">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className="markdown-paragraph">
            {block.content}
          </p>
        );
      })}
    </div>
  );
}

function MetricCard({ item }) {
  const card = (
    <div className="metric-card">
      <div className="metric-card__label">{item.label}</div>
      <div className="metric-card__value">{item.value}</div>
      <div className="metric-card__note">{item.note}</div>
    </div>
  );

  if (item.to) {
    return (
      <Link to={item.to} className="metric-card-link">
        {card}
      </Link>
    );
  }

  return (
    card
  );
}

function getFeaturedNotes(notes) {
  return notes.filter((item) => item.featuredOnHome);
}

function HomeFooter({ footer }) {
  return (
    <section className="home-footer" aria-label="Personal links">
      <div className="home-footer__hero">
        <div className="home-footer__follow">
          <div className="home-footer__label">{footer.followLabel}</div>
          <div className="home-footer__socials">
              {footer.links.map((item) =>
                item.qrImage ? (
                  <button
                    key={item.label}
                    type="button"
                    className="home-footer__social home-footer__social--qr"
                    aria-label={item.title || item.label}
                  >
                    <HomeFooterIcon icon={item.icon} />
                    <span className="home-footer__social-popover home-footer__social-popover--qr">
                      <img
                        className="home-footer__qr-image"
                        src={qrCodeImage}
                        alt={item.title || item.label}
                      />
                    </span>
                  </button>
                ) : item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="home-footer__social"
                    aria-label={item.title || item.label}
                  >
                    <HomeFooterIcon icon={item.icon} />
                    <span className="home-footer__social-popover">
                      {item.title || item.label}
                    </span>
                  </a>
                ) : (
                  <div
                    key={item.label}
                    className="home-footer__social home-footer__social--disabled"
                    aria-label={item.title || item.label}
                  >
                    <HomeFooterIcon icon={item.icon} />
                    <span className="home-footer__social-popover">
                      {item.fallbackLabel || item.title || item.label}
                    </span>
                  </div>
                ),
              )}
          </div>
        </div>
        </div>

        <div className="home-footer__bottom">
        <div>{footer.copyright}</div>
        <div>{footer.declaration}</div>
      </div>
    </section>
  );
}

function HomeFooterIcon({ icon }) {
  if (icon === "email") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="home-footer__icon"
        aria-hidden="true"
      >
        <path
          d="M4.5 7.2h15a1.8 1.8 0 0 1 1.8 1.8v6a1.8 1.8 0 0 1-1.8 1.8h-15A1.8 1.8 0 0 1 2.7 15V9a1.8 1.8 0 0 1 1.8-1.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="m4.6 8.2 7.4 5.5 7.4-5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (icon === "github") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="home-footer__icon"
        aria-hidden="true"
      >
        <path
          d="M12 3.2a8.8 8.8 0 0 0-2.78 17.15c.44.08.6-.19.6-.43v-1.5c-2.46.53-2.98-1.05-2.98-1.05-.4-1.03-.98-1.3-.98-1.3-.8-.55.06-.54.06-.54.89.06 1.36.92 1.36.92.78 1.35 2.06.96 2.57.73.08-.58.31-.96.56-1.18-1.97-.23-4.05-.98-4.05-4.38 0-.97.34-1.76.91-2.38-.09-.22-.39-1.13.09-2.35 0 0 .74-.24 2.42.91a8.4 8.4 0 0 1 4.4 0c1.68-1.15 2.42-.91 2.42-.91.48 1.22.18 2.13.09 2.35.57.62.91 1.41.91 2.38 0 3.41-2.08 4.15-4.06 4.37.32.28.6.82.6 1.66v2.45c0 .24.16.52.61.43A8.8 8.8 0 0 0 12 3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (icon === "repo") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="home-footer__icon"
        aria-hidden="true"
      >
        <path
          d="M6.5 5.5h8.2a2.8 2.8 0 0 1 2.8 2.8v9.2H9.3a2.8 2.8 0 0 0-2.8 2.8V8.3a2.8 2.8 0 0 1 2.8-2.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M6.5 17.5h8.2a2.8 2.8 0 0 1 2.8 2.8H9.3a2.8 2.8 0 0 0-2.8-2.8Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 9.3h5.1M9.5 12.1h5.1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (icon === "xiaohongshu") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="home-footer__icon"
        aria-hidden="true"
      >
        <rect
          x="4.2"
          y="5.5"
          width="15.6"
          height="13"
          rx="3.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <text
          x="12"
          y="14"
          textAnchor="middle"
          fontSize="6.2"
          fontWeight="700"
          letterSpacing="0.08em"
          fill="currentColor"
        >
          RED
        </text>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className="home-footer__icon"
      aria-hidden="true"
    >
      <path
        d="M10 6.2c-3.25 0-5.8 2.1-5.8 4.85 0 1.58.83 2.98 2.23 3.88l-.46 2.18 2.16-1.16c.58.12 1.2.18 1.87.18 3.24 0 5.8-2.1 5.8-4.9S13.24 6.2 10 6.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M15.2 10.2c2.63.16 4.6 1.95 4.6 4.18 0 1.26-.63 2.4-1.72 3.15l.36 1.67-1.66-.9c-.45.1-.93.14-1.43.14-2.53 0-4.58-1.6-4.82-3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx="8.3" cy="11" r="0.9" fill="currentColor" />
      <circle cx="11.1" cy="11" r="0.9" fill="currentColor" />
      <circle cx="13.9" cy="11" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BackgroundTexture() {
  return (
    <>
      <div className="background-texture" aria-hidden="true" />
      <div
        className="background-glow background-glow--blue"
        aria-hidden="true"
      />
      <div
        className="background-glow background-glow--sage"
        aria-hidden="true"
      />
    </>
  );
}

function SiteEffects({ data }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const { title, description } = resolveRouteMeta(location.pathname, data);
    document.title = title;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [location.pathname, data]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let retries = 0;

    const queueTypeset = () => {
      if (cancelled) return;

      const mathJax = window.MathJax;
      if (!mathJax?.typesetPromise) {
        if (retries < 10) {
          retries += 1;
          window.setTimeout(queueTypeset, 120);
        }
        return;
      }

      const run = () => {
        if (cancelled) return;
        mathJax.typesetClear?.();
        mathJax.typesetPromise?.().catch(() => {});
      };

      if (mathJax.startup?.promise?.then) {
        mathJax.startup.promise.then(run).catch(() => {});
        return;
      }

      run();
    };

    queueTypeset();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, data.notes, data.noteCollections]);

  return null;
}

function resolveRouteMeta(pathname, data) {
  const segments = pathname.split("/").filter(Boolean);
  const siteTitle = data.seo.siteTitle;

  if (segments.length === 0) {
    return {
      title: siteTitle,
      description: data.seo.description,
    };
  }

  const routeMeta = {
    about: {
      title: "About",
      description: data.about.heroDesc,
    },
    notes: {
      title: "Notes",
      description:
        "Structured notes across mechanics, numerical methods, implementation details, and working ideas.",
      items: data.notes,
    },
    research: {
      title: "Research",
      description:
        "Longer-running themes, paper trails, and technical directions worth returning to.",
      items: data.research,
    },
    projects: {
      title: "Projects",
      description:
        "Code, validation work, prototypes, and small systems built along the way.",
      items: data.projects,
    },
    resources: {
      title: "Resources",
      description:
        "Templates, setup notes, reusable references, and workflow scaffolds.",
      items: data.resources,
    },
    journal: {
      title: "Journal",
      description:
        "Progress logs, reflections, and technical writing that sit between notes and essays.",
      items: data.journal,
    },
  };

  const currentRoute = routeMeta[segments[0]];
  if (!currentRoute) {
    return {
      title: siteTitle,
      description: data.seo.description,
    };
  }

  if (segments.length > 1 && currentRoute.items) {
    const detail = currentRoute.items.find((item) => item.slug === segments[1]);
    if (detail) {
      if (segments.length > 2 && detail.entries) {
        const entry = detail.entries.find((item) => item.slug === segments[2]);
        if (entry) {
          return {
            title: `${entry.title} | ${siteTitle}`,
            description: entry.desc || currentRoute.description,
          };
        }
      }

      return {
        title: `${detail.title} | ${siteTitle}`,
        description: detail.desc || currentRoute.description,
      };
    }
  }

  return {
    title: `${currentRoute.title} | ${siteTitle}`,
    description: currentRoute.description,
  };
}

function loadFeaturedNoteSlugs(notes) {
  const defaultFeatured = notes
    .filter((item) => item.featuredOnHome)
    .map((item) => item.slug);

  if (typeof window === "undefined") {
    return defaultFeatured;
  }

  try {
    const raw = window.localStorage.getItem(FEATURED_NOTES_STORAGE_KEY);
    if (!raw) return defaultFeatured;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultFeatured;

    const validSlugs = new Set(notes.map((item) => item.slug));
    return parsed.filter((slug) => validSlugs.has(slug));
  } catch {
    return defaultFeatured;
  }
}

function buildNoteCollections(collections, entries) {
  return collections.map((collection) => {
    const collectionEntries = entries.filter(
      (entry) =>
        !collection.entrySlugs?.length || collection.entrySlugs.includes(entry.slug),
    );

    return {
      ...collection,
      meta: `${collectionEntries.length} notes`,
      entries: collectionEntries,
      to: `/notes/${collection.slug}`,
    };
  });
}

function parseMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed === "$$") {
      const mathLines = [];
      index += 1;

      while (index < lines.length && lines[index].trim() !== "$$") {
        mathLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        type: "math",
        content: mathLines.join("\n").trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({
        type: "heading",
        depth: 3,
        content: trimmed.slice(4).trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        type: "heading",
        depth: 2,
        content: trimmed.slice(3).trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("- ")) {
      const items = [];

      while (index < lines.length && lines[index].trim().startsWith("- ")) {
        items.push(lines[index].trim().slice(2).trim());
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items = [];

      while (index < lines.length && /^\d+\.\s/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s/, "").trim());
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines = [];
    while (index < lines.length) {
      const current = lines[index].trim();
      if (
        !current ||
        current === "$$" ||
        current.startsWith("## ") ||
        current.startsWith("### ") ||
        current.startsWith("- ") ||
        /^\d+\.\s/.test(current)
      ) {
        break;
      }

      paragraphLines.push(current);
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return blocks;
}

import "./styles.css";
import { siteData } from "./siteData";
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

export default function App() {
  return (
    <div className="site-shell">
      <BackgroundTexture />
      <Header profile={siteData.profile} nav={siteData.nav} />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<HomePage data={siteData} />} />
          <Route path="/notes" element={<NotesPage data={siteData} />} />
          <Route
            path="/notes/:slug"
            element={<NoteDetailPage data={siteData} />}
          />
          <Route path="/research" element={<ResearchPage data={siteData} />} />
          <Route
            path="/research/:slug"
            element={<ResearchDetailPage data={siteData} />}
          />
          <Route path="/projects" element={<ProjectsPage data={siteData} />} />
          <Route
            path="/projects/:slug"
            element={<ProjectDetailPage data={siteData} />}
          />
          <Route
            path="/resources"
            element={<ResourcesPage data={siteData} />}
          />
          <Route
            path="/resources/:slug"
            element={<ResourceDetailPage data={siteData} />}
          />
          <Route path="/journal" element={<JournalPage data={siteData} />} />
          <Route
            path="/journal/:slug"
            element={<JournalDetailPage data={siteData} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function Header({ profile, nav }) {
  const pathMap = {
    Home: "/",
    Notes: "/notes",
    Research: "/research",
    Projects: "/projects",
    Resources: "/resources",
    Journal: "/journal",
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" to="/">
          <div className="brand__mark">F</div>
          <div className="brand__meta">
            <div className="brand__badge">{profile.badge}</div>
            <div className="brand__name">{profile.name}</div>
          </div>
        </Link>

        <nav className="top-nav" aria-label="Primary">
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

        <button className="about-link">{profile.aboutLabel}</button>
      </div>
    </header>
  );
}

function HomePage({ data }) {
  const { profile, metrics } = data;

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
          meta={`${data.notes.length} topics`}
        />
        <div className="card-grid card-grid--3">
          {data.notes.map((card) => (
            <Link
              key={card.slug}
              to={`/notes/${card.slug}`}
              className="soft-card-link"
            >
              <article className="soft-card">
                <div className="card-topline">
                  <div
                    className={`icon-badge icon-badge--${card.accent || "blue"}`}
                  >
                    {card.icon}
                  </div>
                  <span className="card-meta">{card.meta}</span>
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <p className="card-desc card-desc--zh">{card.descZh}</p>
                <div className="card-link">Open topic ↗</div>
              </article>
            </Link>
          ))}
        </div>
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
            <Link
              key={card.slug}
              to={`/notes/${card.slug}`}
              className="soft-card-link"
            >
              <article className="soft-card">
                <div className="card-topline">
                  <div
                    className={`icon-badge icon-badge--${card.accent || "blue"}`}
                  >
                    {card.icon}
                  </div>
                  <span className="card-meta">{card.meta}</span>
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-desc">{card.desc}</p>
                <p className="card-desc card-desc--zh">{card.descZh}</p>
                <div className="card-link">Open topic ↗</div>
              </article>
            </Link>
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

function NoteDetailPage({ data }) {
  return (
    <DetailPage
      item={findBySlug(data.notes)}
      backTo="/notes"
      backLabel="Back to Notes"
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

function DetailPage({ item, backTo, backLabel }) {
  if (!item) return <Navigate to={backTo} replace />;

  return (
    <section className="detail-page">
      <Link to={backTo} className="detail-page__back">
        ← {backLabel}
      </Link>

      <div className="section-eyebrow">
        <span>Detail page</span>
        <span className="section-eyebrow__line" />
      </div>

      <h1 className="detail-page__title">{item.title}</h1>

      {item.content?.summary && (
        <p className="detail-page__summary">{item.content.summary}</p>
      )}
      {item.descZh && (
        <p className="detail-page__summary detail-page__summary--zh">
          {item.descZh}
        </p>
      )}

      <div className="detail-page__body">
        {item.content?.paragraphs?.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </div>
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

function MetricCard({ item }) {
  return (
    <div className="metric-card">
      <div className="metric-card__label">{item.label}</div>
      <div className="metric-card__value">{item.value}</div>
      <div className="metric-card__note">{item.note}</div>
    </div>
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

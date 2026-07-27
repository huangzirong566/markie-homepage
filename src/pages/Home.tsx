import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CirclePlay,
  Globe2,
  Layers3,
  Menu,
  Sparkles,
  X,
} from 'lucide-react';

type Category = 'All' | 'AI Video' | 'Content' | 'Product' | 'Visual' | 'Research';

type CaseStudy = {
  id: string;
  title: string;
  eyebrow: string;
  category: Exclude<Category, 'All'>;
  type: string;
  summary: string;
  accent: string;
  tags: string[];
  brief: string;
  approach: string[];
  deliverables: string[];
  proof: string;
  video?: string;
  poster?: string;
  cover?: string;
  link?: { label: string; href: string };
};

const services = [
  ['01', 'AI ads & product video', 'Reference-led product films, AI UGC concepts, storyboards, generation, edit, captions, sound and final QA.', 'DTC launches · Social ads · Ongoing content'],
  ['02', 'SaaS demos & product UX', 'From an ambiguous brief to a mapped flow, a clear product narrative and a working, reviewable web prototype.', 'AI tools · Internal workflows · MVP validation'],
  ['03', 'Mandarin content & localization', 'Native spoken-language judgment, subtitle adaptation, bilingual scripts and structured AI-dubbing review.', 'Apps · Education · China-facing content'],
  ['04', 'Short-form content systems', 'Hook banks, 15–60 second scripts, shot lists, platform versions and clean handoff packs.', 'TikTok · Reels · Shorts · Faceless channels'],
  ['05', 'AI product visuals', 'Campaign-ready key visuals, product compositions and repeatable creative directions—not isolated prompt experiments.', 'Ecommerce · Beauty · Lifestyle · Launch kits'],
  ['06', 'Research & AI-assisted ops', 'Traceable sources, explicit schemas, repeatable SOPs and human-in-the-loop workflows for lean teams.', 'Market research · Sourcing · Content operations'],
];

const cases: CaseStudy[] = [
  {
    id: 'product-reel',
    title: 'AI product commercials',
    eyebrow: 'Three-film vertical reel',
    category: 'AI Video',
    type: 'Independent spec series',
    summary: 'Three reference-led product concepts built from art direction and prompting through edit, sound and technical QA.',
    accent: 'lime',
    tags: ['AI direction', 'Product video', 'Editing', 'QA'],
    brief: 'Show that AI-generated product video can feel like a coherent campaign—not a folder of disconnected model outputs.',
    approach: [
      'Defined a visual arc, product behavior and shot purpose before generation.',
      'Rejected versions with geometry, wording or continuity problems.',
      'Edited, sound-designed and normalized the web reel for reliable delivery.',
    ],
    deliverables: ['45.24s H.264 + AAC reel', '1080 × 1920 web master', 'Source 4K generation masters and QA notes'],
    proof: 'Real playable independent spec series. Not commissioned, sponsored or performance-tested for a client.',
    video: '/media/ai-product-commercials-reel-web.mp4',
    poster: '/media/ai-product-commercials-poster.jpg',
  },
  {
    id: 'digital-human',
    title: 'AI digital human videos',
    eyebrow: 'Beauty, tech and lifestyle presenters',
    category: 'AI Video',
    type: 'Independent spec series',
    summary: 'A three-format presenter reel showing script structure, avatar direction, lip-sync review and failure-version filtering.',
    accent: 'coral',
    tags: ['Digital human', 'Script', 'Lip-sync QA', 'Vertical'],
    brief: 'Demonstrate human review across three presenter styles instead of treating a generated talking head as automatically finished.',
    approach: [
      'Matched delivery style, scene and cadence to three distinct content intents.',
      'Used transcript checks to catch repeated or incorrect wording.',
      'Selected passing generations, then edited and packaged a consistent vertical reel.',
    ],
    deliverables: ['45.24s H.264 + AAC reel', '1080 × 1920 web master', 'Script and transcript QA record'],
    proof: 'Real playable independent spec series. Avatars are synthetic; no spokesperson endorsement is implied.',
    video: '/media/ai-digital-human-reel-web.mp4',
    poster: '/media/ai-digital-human-poster.jpg',
  },
  {
    id: 'object-removal',
    title: 'Moving-object video cleanup',
    eyebrow: 'Before / after restoration',
    category: 'AI Video',
    type: 'Independent demonstration',
    summary: 'A 15-second before-and-after sample focused on removal quality, motion continuity and disciplined frame inspection.',
    accent: 'blue',
    tags: ['Object removal', 'Frame QA', 'Continuity', 'Repair'],
    brief: 'Remove a moving accessory while preserving the subject, head movement, background and clothing color.',
    approach: [
      'Tested multiple versions and rejected residual or blurred results.',
      'Checked five evenly spaced frames for leftovers and temporal instability.',
      'Built a direct before / after master so the result stays inspectable.',
    ],
    deliverables: ['15.16s before / after master', '1080 × 1920 H.264 + AAC', 'Frame-level QA notes'],
    proof: 'Real playable independent demonstration. No client relationship or universal one-click removal claim is made.',
    video: '/media/ai-object-removal-before-after-web.mp4',
    poster: '/media/ai-object-removal-cover.jpg',
    link: {
      label: 'View published Upwork case',
      href: 'https://www.upwork.com/freelancers/~017ae509c12793b4ef?p=2081396567415533568',
    },
  },
  {
    id: 'whiteboard',
    title: 'WhiteboardAI live product',
    eyebrow: 'Creator workflow to web product',
    category: 'Product',
    type: 'Personal product',
    summary: 'A live whiteboard-recording workspace shaped through requirements, interaction design, implementation and iterative QA.',
    accent: 'purple',
    tags: ['Product', 'UX', 'Next.js', 'Excalidraw'],
    brief: 'Turn a broad “whiteboard video” idea into a usable workflow for creating, explaining and recording.',
    approach: [
      'Mapped the end-to-end creation journey and narrowed the MVP.',
      'Designed the workspace around a complex editing canvas and recording flow.',
      'Implemented and iterated state, login, analytics and production behavior.',
    ],
    deliverables: ['Live responsive web product', 'Requirements and iteration record', 'Interaction and QA documentation'],
    proof: 'Real personal product. It evolved from earlier company-side product patterns; no claim of wholly original underlying editor technology is made.',
    link: { label: 'Open live product', href: 'https://whiteboardai.cc' },
  },
  {
    id: 'campaign-visuals',
    title: 'Fictional product launch kit',
    eyebrow: 'Beauty and hydration key visuals',
    category: 'Visual',
    type: 'Independent AI-assisted concepts',
    summary: 'Two campaign directions designed around believable materials, social crop safety and usable copy space.',
    accent: 'sand',
    tags: ['Product imagery', 'Art direction', 'DTC', 'Social'],
    brief: 'Create portfolio imagery that behaves like usable campaign material rather than decorative AI output.',
    approach: [
      'Specified audience, medium, materials, lighting and crop behavior.',
      'Kept both products fictional and avoided unsupported claims.',
      'Added a headline system that can expand into a multi-placement ad set.',
    ],
    deliverables: ['1122 × 1402 serum key visual', '1122 × 1402 hydration key visual', 'Headline and placement direction'],
    proof: 'Original AI-assisted independent concepts made for this portfolio. No existing brand, client or performance result is implied.',
    cover: '/media/serum-spec-key-visual.png',
  },
  {
    id: 'rendercost',
    title: 'RenderCost MVP',
    eyebrow: 'AI media cost comparison',
    category: 'Product',
    type: 'Independent prototype',
    summary: 'A working decision tool that structures image and video generation prices into a simpler comparison flow.',
    accent: 'blue',
    tags: ['Product strategy', 'Next.js', 'Data model', 'MVP'],
    brief: 'Make fragmented AI generation pricing easier for creators and small teams to compare.',
    approach: [
      'Structured providers, models, units and media-specific pricing rules.',
      'Designed around actual selection and comparison tasks.',
      'Built and validated the Next.js MVP with type-check, lint and production build.',
    ],
    deliverables: ['Responsive calculator', 'Typed pricing schema', 'Validation and iteration plan'],
    proof: 'Real local prototype, not a comprehensive live market database. Pricing is time-sensitive and requires refresh before purchasing decisions.',
  },
  {
    id: 'creative-pack',
    title: 'Short-form creative pack',
    eyebrow: 'Hooks, scripts and handoff',
    category: 'Content',
    type: 'Independent writing sample',
    summary: 'Four production-ready structures across UGC, founder-led, faceless and Mandarin-adapted content.',
    accent: 'coral',
    tags: ['Copywriting', 'UGC scripts', 'Shot lists', 'Mandarin'],
    brief: 'Demonstrate actual writing and production thinking instead of listing “scriptwriting” as an unsupported skill.',
    approach: [
      'Separated spoken copy, on-screen text and visual direction.',
      'Built a repeatable hook bank around specific buyer intents.',
      'Included a natural Mandarin adaptation—not a literal word-for-word translation.',
    ],
    deliverables: ['Four sample scripts', 'Hook bank', 'Shot-by-shot production notes'],
    proof: 'Original portfolio samples for fictional products. No client relationship or performance result is claimed.',
    link: { label: 'Open full sample pack', href: '/downloads/creative-sample-pack.html' },
  },
  {
    id: 'research-pack',
    title: 'China research workflow',
    eyebrow: 'Traceable supplier research',
    category: 'Research',
    type: 'Sanitized workflow sample',
    summary: 'A repeatable schema that turns a broad sourcing brief into a checked, decision-ready research pack.',
    accent: 'lime',
    tags: ['China research', 'Source QA', 'Sourcing', 'Spreadsheet'],
    brief: 'Reduce the buyer’s time spent separating plausible suppliers from incomplete search results.',
    approach: [
      'Defined required fields and evidence rules before collection.',
      'Separated published capability, fit assessment and unknowns.',
      'Preserved source dates and structured follow-up questions.',
    ],
    deliverables: ['Supplier shortlist schema', 'Source and confidence fields', 'Buyer-side QA checklist'],
    proof: 'Sanitized process sample. Commercial fit, certifications, pricing and ownership still require direct buyer due diligence.',
    link: { label: 'Open sanitized sample', href: '/downloads/research-sample.html' },
  },
];

const signals = [
  ['+329%', 'AI video generation & editing demand', 'Upwork · 2026', 'https://investors.upwork.com/news-releases/news-release-details/upworks-demand-skills-2026-demand-top-ai-skills-more-doubles-ai'],
  ['+265%', 'AI UGC video ad search growth', 'Fiverr · Jun 2026', 'https://www.fiverr.com/resources/guides/reports/business-trends-index-june-2026'],
  ['+403%', 'Canva designer search growth', 'Fiverr · Jun 2026', 'https://www.fiverr.com/resources/guides/reports/business-trends-index-june-2026'],
  ['+55%', 'Translation service search growth', 'Fiverr · Jun 2026', 'https://www.fiverr.com/resources/guides/reports/business-trends-index-june-2026'],
];

const categories: Category[] = ['All', 'AI Video', 'Content', 'Product', 'Visual', 'Research'];

function CaseVisual({ item, interactive = false }: { item: CaseStudy; interactive?: boolean }) {
  if (item.video) {
    return (
      <video
        className="case-media"
        src={interactive ? item.video : undefined}
        poster={item.poster}
        controls={interactive}
        preload="metadata"
        playsInline
        aria-label={`${item.title} video sample`}
      />
    );
  }
  if (item.cover) return <img className="case-media" src={item.cover} alt={`${item.title} key visual`} />;
  if (item.id === 'whiteboard') {
    return (
      <div className="mockup whiteboard-mockup" aria-label="WhiteboardAI interface illustration">
        <div className="mock-toolbar"><i /><i /><i /><i /></div>
        <div className="canvas-card card-a">Idea</div>
        <div className="canvas-card card-b">Explain</div>
        <div className="canvas-arrow">→</div>
        <div className="record-pill"><i /> Recording</div>
      </div>
    );
  }
  if (item.id === 'rendercost') {
    return (
      <div className="mockup cost-mockup" aria-label="RenderCost interface illustration">
        <span>Estimated project cost</span>
        <strong>$12.48</strong>
        <div className="cost-bars"><i /><i /><i /></div>
        <div className="cost-row"><span>Video</span><b>$9.60</b></div>
        <div className="cost-row"><span>Images</span><b>$2.88</b></div>
      </div>
    );
  }
  if (item.id === 'research-pack') {
    return (
      <div className="mockup sheet-mockup" aria-label="Supplier research spreadsheet illustration">
        <div className="sheet-head"><span>Supplier</span><span>Source</span><span>Status</span></div>
        {[0, 1, 2, 3].map((row) => <div className="sheet-row" key={row}><i /><i /><i className={row < 3 ? 'checked' : ''} /></div>)}
      </div>
    );
  }
  return (
    <div className="mockup script-mockup" aria-label="Short-form script document illustration">
      <span>00:00—00:03 · Hook</span>
      <strong>You don’t need more time.</strong>
      <div><i /><i /><i /></div>
      <small>Visual · Spoken · On-screen</small>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleCases = useMemo(
    () => cases.filter((item) => activeCategory === 'All' || item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">MARK<span>®</span></a>
        <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation">
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a className="nav-cta" href="https://www.upwork.com/freelancers/~017ae509c12793b4ef" target="_blank" rel="noreferrer">
            Upwork <ArrowUpRight />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <div className="availability"><i /> Available for focused freelance projects</div>
            <h1>AI content that <em>moves.</em><br />Product thinking that <em>ships.</em></h1>
            <p className="hero-lede">
              I’m Mark Huang—a Mandarin-native product manager and hands-on creator in China. I turn ambiguous briefs into
              watchable videos, usable prototypes, campaign visuals and decision-ready research.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#work">Explore selected work <ArrowRight /></a>
              <a className="text-link" href="#services">See what I deliver <ChevronRight /></a>
            </div>
            <div className="hero-proof">
              <span><Check /> Real playable work</span>
              <span><Check /> Clear proof boundaries</span>
              <span><Check /> Async-friendly delivery</span>
            </div>
          </div>
          <div className="hero-stage" aria-label="Portfolio preview">
            <div className="stage-note">Brief → direction → final asset</div>
            <div className="stage-card stage-video">
              <video src="/media/ai-product-commercials-reel-web.mp4" poster="/media/ai-product-commercials-poster.jpg" muted autoPlay loop playsInline preload="metadata" />
              <div className="media-chip"><CirclePlay /> Product reel</div>
            </div>
            <div className="stage-card stage-image">
              <img src="/media/serum-spec-key-visual.png" alt="Fictional serum campaign concept" />
              <div className="media-chip">Spec campaign</div>
            </div>
            <div className="stage-mark"><Sparkles /><span>Human-directed<br />AI production</span></div>
          </div>
        </section>

        <section className="signal-band" aria-labelledby="signals-title">
          <div className="signal-intro">
            <span className="section-kicker" id="signals-title">Why these offers</span>
            <p>Positioning follows current marketplace demand—not a random list of tools.</p>
          </div>
          <div className="signal-grid">
            {signals.map(([value, label, source, href]) => (
              <a href={href} target="_blank" rel="noreferrer" className="signal" key={label}>
                <strong>{value}</strong><span>{label}</span><small>{source} <ArrowUpRight /></small>
              </a>
            ))}
          </div>
        </section>

        <section className="work-section section-pad" id="work">
          <div className="section-heading">
            <div><span className="section-kicker">Selected work · 8 case studies</span><h2>Proof across content, product and operations.</h2></div>
            <p>Each piece is labeled so real products, playable samples and independent concepts stay easy to distinguish.</p>
          </div>
          <div className="filter-row" role="tablist" aria-label="Filter portfolio">
            {categories.map((category) => (
              <button className={activeCategory === category ? 'filter active' : 'filter'} key={category} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>
                {category}
              </button>
            ))}
          </div>
          <div className="case-grid">
            {visibleCases.map((item, index) => (
              <article className={`case-card accent-${item.accent}`} key={item.id}>
                <button className="case-open" onClick={() => setSelectedCase(item)} aria-label={`Open ${item.title} case study`}>
                  <div className="case-visual">
                    <CaseVisual item={item} />
                    <span className="case-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="case-type">{item.type}</span>
                  </div>
                  <div className="case-body">
                    <div className="case-eyebrow">{item.eyebrow}</div>
                    <h3>{item.title}</h3>
                    <p>{item.summary}</p>
                    <div className="tag-list">{item.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="case-link">View case study <ArrowUpRight /></div>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-heading light">
            <div><span className="section-kicker">Service menu</span><h2>Six clear ways to hire me.</h2></div>
            <p>Broad capability, packaged as specific outcomes. A project can combine lanes without becoming vague.</p>
          </div>
          <div className="service-list">
            {services.map(([number, title, copy, fit]) => (
              <article className="service-row" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p><small>Best for: {fit}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="campaign-section section-pad">
          <div className="campaign-copy">
            <span className="section-kicker">New visual portfolio</span>
            <h2>From blank brief to coherent ad system.</h2>
            <p>Two fictional concepts show material direction, crop safety and headline planning. No client, brand authorization or performance result is implied.</p>
            <div className="campaign-points"><span>01 · Material & lighting logic</span><span>02 · 4:5 crop-safe composition</span><span>03 · Headline and variant planning</span></div>
            <button className="button button-dark" onClick={() => setSelectedCase(cases.find((item) => item.id === 'campaign-visuals') || null)}>
              Open visual case <ArrowRight />
            </button>
          </div>
          <div className="campaign-images">
            <figure><img src="/media/serum-spec-key-visual.png" alt="Fictional serum campaign visual" /><figcaption>QUIET SKIN.<br />CLEAR RITUAL.</figcaption></figure>
            <figure><img src="/media/hydration-spec-key-visual.png" alt="Fictional hydration campaign visual" /><figcaption>MIX. MOVE.<br />KEEP GOING.</figcaption></figure>
          </div>
        </section>

        <section className="process-section section-pad" id="process">
          <div className="section-heading">
            <div><span className="section-kicker">Working model</span><h2>Fast does not have to mean fuzzy.</h2></div>
            <p>A compact system keeps scope, proof and review criteria visible from the start.</p>
          </div>
          <div className="process-grid">
            {[
              ['01', 'Clarify the outcome', 'Audience, deliverables, proof standard and exclusions become explicit.'],
              ['02', 'Build a reviewable direction', 'You see the structure or prototype before time is spent polishing.'],
              ['03', 'Produce and QA', 'I check technical properties, continuity, pacing, copy and data quality.'],
              ['04', 'Handoff cleanly', 'Final files include naming, source notes, limitations and the next useful action.'],
            ].map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="fit-section section-pad">
          <div className="fit-panel">
            <div><span className="section-kicker">A good fit if</span><h2>You need one accountable operator between idea and delivery.</h2></div>
            <ul>
              <li><Check /> You have a reference, rough brief or messy process—but not a clean production plan.</li>
              <li><Check /> You value inspectable work and honest limitations over inflated claims.</li>
              <li><Check /> You need China context, Mandarin judgment or async time-zone collaboration.</li>
            </ul>
          </div>
        </section>

        <section className="contact-section section-pad">
          <Globe2 className="contact-globe" />
          <span className="section-kicker">Start with a concrete brief</span>
          <h2>Tell me the outcome.<br />I’ll map the smallest credible path.</h2>
          <p>Based in China · Mandarin native · English collaboration · Product manager at Meitu’s Kaipai app</p>
          <a className="button button-light" href="https://www.upwork.com/freelancers/~017ae509c12793b4ef" target="_blank" rel="noreferrer">
            View my Upwork profile <ArrowUpRight />
          </a>
          <div className="contact-foot"><span>© {new Date().getFullYear()} Mark Huang</span><span>AI content · Product · China research</span></div>
        </section>
      </main>

      {selectedCase && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setSelectedCase(null)}>
          <section className="case-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedCase(null)} aria-label="Close case study"><X /></button>
            <div className="modal-visual"><CaseVisual item={selectedCase} interactive /></div>
            <div className="modal-content">
              <div className="modal-meta"><span>{selectedCase.category}</span><span>{selectedCase.type}</span></div>
              <h2 id="modal-title">{selectedCase.title}</h2>
              <p className="modal-summary">{selectedCase.summary}</p>
              <div className="modal-section"><h3>The brief</h3><p>{selectedCase.brief}</p></div>
              <div className="modal-section"><h3>Approach</h3><ol>{selectedCase.approach.map((step) => <li key={step}>{step}</li>)}</ol></div>
              <div className="modal-section"><h3>Deliverables</h3><ul>{selectedCase.deliverables.map((item) => <li key={item}><Check /> {item}</li>)}</ul></div>
              <div className="proof-note"><Layers3 /><div><strong>Proof boundary</strong><p>{selectedCase.proof}</p></div></div>
              {selectedCase.id === 'campaign-visuals' && <div className="modal-image-pair"><img src="/media/serum-spec-key-visual.png" alt="Serum visual" /><img src="/media/hydration-spec-key-visual.png" alt="Hydration visual" /></div>}
              {selectedCase.link && <a className="button button-dark" href={selectedCase.link.href} target="_blank" rel="noreferrer">{selectedCase.link.label} <ArrowUpRight /></a>}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

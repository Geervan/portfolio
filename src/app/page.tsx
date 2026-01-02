import TactileButton from "@/components/TactileButton";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap-reverse', position: 'relative' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '0.5rem' }}>
            <span className="pinned-paper">Geervan</span>
          </h1>
          <p style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary-text)', transform: 'rotate(1deg)' }}>
            Aspiring AI/Technical PM || Aspiring SDE
          </p>

          <p style={{ fontSize: '1.4rem', marginTop: '1.5rem', lineHeight: '1.6', maxWidth: '90%' }}>
            Bridging the gap between Engineering and Product Thinking.
            <br />
            Currently obsessed with <span className="tech-note">LLMs, Agents</span> and <span className="tech-note">Product,UX</span>.
          </p>

          {/* Desk Info Stack */}
          <div className="sticky-stack" style={{ marginTop: '2rem', marginLeft: '1rem', float: 'left', marginRight: '2rem' }}>
            <p style={{ margin: 0, borderBottom: '1px dashed #333', paddingBottom: '0.2rem' }}>✓ Shipped 3 Projects</p>
            <p style={{ margin: '0.5rem 0', borderBottom: '1px dashed #333', paddingBottom: '0.2rem' }}>Currently: Product & LLMs</p>
            <p style={{ margin: 0 }}>Status: <b>Caffeinated ☕</b></p>
          </div>

          {/* New Stack Card (Messy Pile) */}
          <div style={{
            marginTop: '3rem',
            display: 'inline-block',
            background: '#fff',
            color: '#333',
            padding: '1.5rem',
            border: '1px solid #ccc',
            borderRadius: '2px',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1)',
            transform: 'rotate(-2deg)',
            maxWidth: '300px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: '#ff5722',
              color: '#fff',
              fontWeight: 'bold',
              padding: '0.2rem 0.5rem',
              fontSize: '0.8rem',
              transform: 'rotate(10deg)',
              boxShadow: '1px 1px 3px rgba(0,0,0,0.3)',
              border: '1px solid #fff'
            }}>
              MY GEAR
            </div>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', borderBottom: '2px solid #333', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>Core Arsenal</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['React', 'Next.js', 'Python', 'Flutter', 'AI Agents'].map(t => (
                <span key={t} style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{t} •</span>
              ))}
            </div>
            <a href="/experience#skills" style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', color: '#e53935', fontWeight: 'bold', textDecoration: 'none' }}>
              Click to see full skillset ➔
            </a>
          </div>

          {/* Social Links for Recruiters */}

        </div>

        <div className="polaroid" style={{ transform: 'rotate(3deg)', width: '280px', flexShrink: 0, position: 'relative' }}>
          {/* Tape holding the photo */}
          <div className="tape"></div>

          <img src="/home_pic.jpeg" alt="Geervan Professional" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center 50%', display: 'block', borderRadius: '2px' }} />
          <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)', color: '#333' }}>Presenting Myself XD</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <a href="https://github.com/geervan" target="_blank" aria-label="GitHub" style={{ color: '#333' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://linkedin.com/in/geervan" target="_blank" aria-label="LinkedIn" style={{ color: '#333' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Coffee Stain Decoration */}
      <div className="coffee-stain" style={{ top: '10%', left: '-50px', transform: 'rotate(-10deg)' }}></div>
      <div className="coffee-stain" style={{ bottom: '20%', right: '-40px', width: '100px', height: '100px', opacity: 0.5 }}></div>

      {/* Margin Notes / Quick Links Area */}
      <section className="section" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: '300px', border: '2px dashed var(--border-color)', padding: '2rem', borderRadius: '10px 50px 10px 50px', position: 'relative' }}>
          <h2>Quick Notes</h2>
          <ul className="handwritten" style={{ listStyle: 'none', fontSize: '1.3rem' }}>
            <li style={{ marginBottom: '1rem' }}>✓ Refactor Portfolio</li>
            <li style={{ marginBottom: '1rem' }}>☐ Launch something cool and Agentic</li>
            <li style={{ marginBottom: '1rem' }}>✓ Fix PR Bot</li>
            <li>☐ Sleep?</li>
          </ul>
        </div>

        <div style={{ flex: 1, minWidth: '300px', border: '2px dashed var(--border-color)', padding: '2rem', borderRadius: '50px 10px 50px 10px', position: 'relative' }}>
          <h2>Scribbles</h2>
          <p style={{ fontSize: '1.4rem', lineHeight: '2' }}>
            Check out my <a href="/projects" className="scribble-link">Projects</a> page for chaos.
          </p>
          <p style={{ fontSize: '1.4rem', lineHeight: '2' }}>
            Or see the <a href="/gallery" className="scribble-link">Gallery</a> to see who I am behind the Screen
          </p>
        </div>
      </section>
    </>
  );
}

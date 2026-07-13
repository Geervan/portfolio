import Link from "next/link";
import { Caveat } from "next/font/google";
import TactileButton from "@/components/TactileButton";
import GithubGraph from "@/components/GithubGraph";

const caveat = Caveat({ subsets: ["latin"], weight: "400" });

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="section" style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap-reverse', position: 'relative' }}>



        <div className="home-intro" style={{ flex: 1, minWidth: 'min(100%, 300px)', position: 'relative', zIndex: 2 }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '0.5rem' }}>
            <span className="pinned-paper">Geervan</span>
          </h1>
          <p style={{ fontSize: '2rem', fontFamily: 'var(--font-heading)', color: 'var(--secondary-text)', transform: 'rotate(1deg)' }}>
            Aspiring AI/Technical PM || Aspiring SDE
          </p>

          <p style={{ fontSize: '1.4rem', marginTop: '1.5rem', lineHeight: '1.6', maxWidth: '90%' }}>
            Bridging the gap between Engineering and Product Thinking.
            <br />
            Currently obsessed with <span className="tech-note">LLMs, Agents</span> and <span className="tech-note">Product,UX</span>.
            <br />
            Looking for Remote AI/Technical PM or AI Internship opportunities.
          </p>

          {/* Desk Info Stack */}
          <div className="sticky-stack" style={{ marginTop: '2rem' }}>
            <p style={{ margin: 0, borderBottom: '1px dashed #333', paddingBottom: '0.2rem' }}>[x] Shipped 3 Projects</p>
            <p style={{ margin: '0.5rem 0', borderBottom: '1px dashed #333', paddingBottom: '0.2rem' }}>Currently: Product & LLMs</p>
            <p style={{ margin: 0 }}>Status: <b>Caffeinated</b></p>
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
            maxWidth: 'min(100%, 300px)',
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
            <a href="/skills" style={{ display: 'block', marginTop: '1rem', fontSize: '0.9rem', color: '#e53935', fontWeight: 'bold', textDecoration: 'none' }}>
              Click to see full skillset {"->"}
            </a>
          </div>

          {/* Social Links for Recruiters */}

        </div>

        {/* Right side wrapper containing the Polaroid, the newspaper clipping, and the joke annotation arrow */}
        <div className="hero-polaroid-wrapper">
          
          {/* Newspaper clipping (non-blocking, sits on top of white border but shifted left and higher) */}
          <img 
            src="/geek.png" 
            alt="Prod DB Deleted" 
            className="newspaper-clipping" 
            style={{ 
              width: "190px", 
              position: "absolute", 
              top: "-100px", 
              left: "-140px", 
              transform: "rotate(-8deg)", 
              zIndex: 4 
            }} 
          />

          {/* Handwritten Joke Annotation Arrow */}
          <div className="joke-arrow desktop-only" style={{ position: 'absolute', top: '-130px', left: '-140px', zIndex: 5, pointerEvents: 'none', width: '580px', height: '350px' }}>
            <svg width="580" height="350" viewBox="0 0 580 350" style={{ overflow: 'visible' }}>
              {/* Curve starting from text on top-right (430, 140), bending over polaroid top (300, 15), terminating cleanly right before the clipping border (175, 75) */}
              <path d="M 430 140 Q 300 15 175 75" fill="none" stroke="#e53935" strokeWidth="2.5" markerEnd="url(#arrowhead)" strokeLinecap="round" />
              <defs>
                <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
                  <path d="M0,0 L12,6 L0,12" fill="none" stroke="#e53935" strokeWidth="2" />
                </marker>
              </defs>
            </svg>
            <p style={{
              position: 'absolute',
              top: '140px',
              left: '440px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1rem',
              fontWeight: 'bold',
              color: '#e53935',
              width: '200px',
              lineHeight: '1.2',
              transform: 'rotate(5deg)'
            }}>
              (It's a joke! I won't actually do it, probably XD)
            </p>
          </div>

          {/* Polaroid */}
          <div className="polaroid" style={{ transform: 'rotate(3deg)', width: '100%', maxWidth: '280px', position: 'relative', paddingBottom: '1.2rem', zIndex: 3 }}>
            {/* Tape holding the photo */}
            <div className="tape"></div>

            <img src="/home_pic_new.jpeg" alt="Geervan Professional" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center 50%', display: 'block', borderRadius: '2px' }} />
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

            <p className={caveat.className} style={{
              textAlign: 'center',
              margin: '0.4rem 0 0 0',
              fontSize: '1.4rem',
              color: '#333',
              fontWeight: 'bold',
              lineHeight: '1.2'
            }}>
              Sign my guestbook{" "}
              <Link
                href="/guestbook"
                className={`tactile-btn ${caveat.className}`}
                style={{
                  fontSize: '1.15rem',
                  padding: '0.1rem 0.6rem',
                  margin: '0 0 0 0.2rem',
                  display: 'inline-block',
                  color: '#1976d2',
                  borderColor: '#1976d2',
                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                  boxShadow: '1px 2px 0px #1976d2',
                  textDecoration: 'none',
                  lineHeight: '1.2'
                }}
              >
                here
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Coffee Stain Decoration */}
      <div className="coffee-stain" style={{ top: '10%', left: '-50px', transform: 'rotate(-10deg)' }}></div>
      <div className="coffee-stain" style={{ bottom: '20%', right: '-40px', width: '100px', height: '100px', opacity: 0.5 }}></div>

      {/* Code Ledger & Sticky Notes Section */}
      <section className="section" style={{ marginTop: '4rem', clear: 'both' }}>
        <GithubGraph />

        {/* Quick links & annotations underneath the graph */}
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '2rem',
            marginTop: '3rem'
        }}>
            {/* Scribbles Sticky Note */}
            <div style={{
                background: '#ffeb3b',
                color: '#333',
                padding: '1.5rem',
                borderRadius: '2px',
                boxShadow: '3px 3px 0px #e6d335, 6px 6px 8px rgba(0,0,0,0.15)',
                transform: 'rotate(-1.5deg)',
                fontFamily: 'var(--font-heading)',
                flex: 1,
                minWidth: 'min(100%, 280px)',
                maxWidth: '450px'
            }}>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0', borderBottom: '2px solid #333', paddingBottom: '0.2rem', fontWeight: 'bold' }}>SCRIBBLES & NAVIGATION</h3>
                <p style={{ fontSize: '1.15rem', margin: '0.5rem 0', lineHeight: '1.5' }}>
                    {"->"} Check out the <a href="/projects" style={{ textDecoration: 'underline', fontWeight: 'bold', color: '#e53935' }}>Projects</a> page for chaotic creations.
                </p>
                <p style={{ fontSize: '1.15rem', margin: '0.5rem 0', lineHeight: '1.5' }}>
                    {"->"} See the <a href="/gallery" style={{ textDecoration: 'underline', fontWeight: 'bold', color: '#e53935' }}>Gallery</a> to see me behind the screen.
                </p>
            </div>

            {/* Dev Logs Sticky Note */}
            <div style={{
                background: '#e0f7fa',
                color: '#006064',
                padding: '1.5rem',
                borderRadius: '2px',
                boxShadow: '3px 3px 0px #b2ebf2, 6px 6px 8px rgba(0,0,0,0.15)',
                transform: 'rotate(1.5deg)',
                fontFamily: 'var(--font-heading)',
                flex: 1,
                minWidth: 'min(100%, 280px)',
                maxWidth: '450px'
            }}>
                <h3 style={{ fontSize: '1.2rem', margin: '0 0 0.8rem 0', borderBottom: '2px solid #006064', paddingBottom: '0.2rem', fontWeight: 'bold' }}>QUICK LOG</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, lineHeight: '1.6', fontSize: '1.1rem' }}>
                    <li>[x] Refactored loose-leaf layout</li>
                    <li>[x] Separated skills view</li>
                    <li>[ ] Sleep & drink more water?</li>
                </ul>
            </div>
        </div>
      </section>
    </>
  );
}

export default function About() {
    return (
        <section className="section">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '3.5rem' }}>
                        The Engineer
                    </h1>
                    <p style={{ fontSize: '1.8rem', color: 'var(--secondary-text)', fontFamily: 'var(--font-heading)', transform: 'rotate(-1deg)', display: 'inline-block' }}>
                        Behind the code.
                    </p>
                    
                    <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.2rem' }}>
                            Currently a CS Undergrad at <strong>Manipal University Jaipur</strong>, I view code as a construction 
                            site where the scaffolding is just as interesting as the finished building. I have a drive for 
                            breaking complex systems just to see how to build them back better.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                            I specialize in the intersection of <strong>Interactive Systems</strong> and <strong>Mathematical Logic</strong>. 
                            Whether I'm diving into 3D rendering with Three.js or architecting custom cryptographic engines, I try to 
                            ensure that the logic never sacrifices the aesthetic.
                        </p>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                            Beyond the terminal, I'm obsessed with "tactile" digital experiences. I believe the best products 
                            should feel organic and responsive, moving away from the standard "boxed" web and toward 
                            interfaces that feel like extensions of human thought.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Photo positioned parallel to Title but slightly lower */}
                    <div className="polaroid" style={{ transform: 'rotate(3deg)', width: '220px', flexShrink: 0, margin: '1.5rem 1rem 0 0' }}>
                        <div className="tape" style={{ left: '50%', top: '-15px', transform: 'translateX(-50%)', opacity: 0.8 }}></div>
                        <img src="/profile-pic.png" alt="Geervan" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                        <p style={{ textAlign: 'center', marginTop: '0.8rem', fontFamily: 'var(--font-heading)', fontSize: '0.9rem' }}>me, pretending to work.</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginTop: '2rem' }}>
                {/* Column 1: Philosophy */}
                <div>
                    <h2 style={{ marginTop: 0, borderBottom: '2px dashed var(--line-color)', paddingBottom: '0.5rem' }}>Design Philosophy</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        I call it <strong>"Living Blueprints"</strong>. The web has become too predictable and boxed in. 
                        I try to create experiences that are tactile, reactive, and occasionally a little bit weird.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        My toolkit balances the rigid precision of <strong>TypeScript</strong> and <strong>C++</strong> with 
                        the creative freedom of <strong>Three.js</strong> and <strong>Interactive Doodling</strong>.
                    </p>
                </div>

                {/* Column 2: Education & Stats */}
                <div>
                    <h2 style={{ marginTop: 0, borderBottom: '2px dashed var(--line-color)', paddingBottom: '0.5rem' }}>Academy Records</h2>
                    <div style={{ marginTop: '1.5rem', borderLeft: '3px solid var(--text-color)', paddingLeft: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Manipal University Jaipur</h3>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>B.Tech - Computer Science & Engineering</p>
                        <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '1.1rem' }}>2024 - 2028 | GPA: 9.33 / 10.0</p>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: 0.8 }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--secondary-text)' }}>
                            "Currently exploring the intersection of mathematical curiosities and interactive web art."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

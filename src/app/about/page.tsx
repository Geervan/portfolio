export default function About() {
    return (
        <section className="section">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <div style={{ flex: 1, minWidth: 'min(100%, 300px)' }}>
                    <h1 style={{ marginBottom: '0.5rem', fontSize: '3.5rem' }}>
                        The Engineer
                    </h1>
                    <p style={{ fontSize: '1.8rem', color: 'var(--secondary-text)', fontFamily: 'var(--font-heading)', transform: 'rotate(-1deg)', display: 'inline-block' }}>
                        Behind the code.
                    </p>

                    <div style={{ marginTop: '2rem', maxWidth: '600px' }}>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '1.2rem' }}>
                            Currently a CS Undergrad at <strong>Manipal University Jaipur</strong>, where I enjoy working on problems that sit between engineering and product design. Most of my projects begin with a small frustration that grows into an opportunity to rethink the experience. I pay attention to the details that often go unnoticed, from awkward interactions to unnecessary friction.
                        </p>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '1.2rem' }}>
                            Whether I'm building AI applications, interactive web experiences, or developer tools, I care as much about how software feels as how it works. I enjoy understanding systems from the inside out and reshaping familiar ideas into something simpler, faster, and more intuitive.
                        </p>

                        <p style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
                            For me, every project starts with curiosity. If something makes someone's workflow smoother or leaves them wondering why every app doesn't work this way, then I've done my job.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Photo positioned parallel to Title but slightly lower */}
                    <div className="polaroid" style={{ transform: 'rotate(3deg)', width: '100%', maxWidth: '300px', flexShrink: 0, margin: '1.5rem 1rem 2.3rem 0' }}>
                        <div className="tape" style={{ left: '50%', top: '-15px', transform: 'translateX(-50%)', opacity: 0.8 }}></div>
                        <img src="/profile-pic.png" alt="Geervan" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                        <p style={{ textAlign: 'center', marginTop: '0.8rem', fontFamily: 'var(--font-heading)', fontSize: '1.2rem' }}>me, pretending to work.</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem', marginTop: '2rem' }}>
                {/* Column 1: Philosophy */}
                <div>
                    <h2 style={{ marginTop: 0, borderBottom: '2px dashed var(--line-color)', paddingBottom: '0.5rem' }}>Design Philosophy</h2>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        I call it <strong>"Living Blueprints"</strong>. I see software as something that should evolve with the person using it. Good interfaces are not made by adding more features,
                        but by removing unnecessary friction and making complex ideas feel simple.
                    </p>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                        My toolkit balances the rigid precision of <strong>TypeScript</strong> and <strong>Flutter</strong> with
                        the creative freedom of <strong>curiosity</strong> and <strong>having fun!</strong>
                    </p>
                </div>

                {/* Column 2: Education & Stats */}
                <div>
                    <h2 style={{ marginTop: 0, borderBottom: '2px dashed var(--line-color)', paddingBottom: '0.5rem' }}>Academy Records</h2>
                    <div style={{ marginTop: '1.5rem', borderLeft: '3px solid var(--text-color)', paddingLeft: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Manipal University Jaipur</h3>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.2rem' }}>B.Tech - Computer Science & Engineering</p>
                        <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '1.1rem' }}>2024 - 2028 | GPA: 9.34 / 10.0</p>
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--border-color)', borderRadius: '8px', opacity: 0.8 }}>
                        <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--secondary-text)' }}>
                            "Curiosity has always been my favorite debugging tool."
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

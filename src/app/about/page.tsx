export default function About() {
    return (
        <section className="section">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                    <h1 style={{ marginBottom: '0.5rem' }}>
                        The Engineer
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: '#666' }}>Behind the code.</p>
                </div>

                {/* Photo positioned parallel to Title but slightly lower */}
                <div className="polaroid" style={{ transform: 'rotate(3deg)', width: '200px', flexShrink: 0, margin: '1.5rem 1rem 0 0' }}>
                    <div className="tape" style={{ left: '50%', top: '-15px', transform: 'translateX(-50%)', opacity: 0.8 }}></div>
                    <img src="/profile-pic.png" alt="Geervan" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', objectPosition: 'center 20%', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '0.8rem', fontFamily: 'var(--font-heading)', fontSize: '0.9rem' }}>me, pretending to work.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>
                {/* Column 1: Notes */}
                <div>
                    <h2 style={{ marginTop: 0 }}>Notes to Self</h2>
                    <p>
                        I believe in building software that feels human.
                        It's not just about the logic, but the experience.
                        When I'm not coding, I'm probably sketching ideas or breaking down complex systems.
                    </p>
                    <p>
                        Always be shipping. Simplify.
                    </p>
                </div>

                {/* Column 2: Education */}
                <div>
                    <h2 style={{ marginTop: 0 }}>Academy Records</h2>
                    <div style={{ marginTop: '1rem', borderLeft: '3px solid var(--text-color)', paddingLeft: '1rem' }}>
                        <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Manipal University Jaipur</h3>
                        <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.1rem' }}>B.Tech - Computer Science & Engineering</p>
                        <p style={{ margin: 0, color: 'var(--secondary-text)', fontSize: '1.1rem' }}>2024 - 2028 | GPA: 9.33/10</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

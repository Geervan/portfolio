"use client";
import React, { useState } from 'react';
import TactileButton from "@/components/TactileButton";
import ImageViewer from "@/components/ImageViewer";

export default function Experience() {
    const [selectedImg, setSelectedImg] = useState<{ src: string, alt: string } | null>(null);

    return (
        <section className="section" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ImageViewer
                isOpen={!!selectedImg}
                src={selectedImg?.src || ''}
                alt={selectedImg?.alt || ''}
                onClose={() => setSelectedImg(null)}
            />
            <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <span className="pinned-paper">Field Logs</span>
            </h1>
            <p style={{ marginBottom: '4rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                Chronicles of professional adventures & side quests.
            </p>

            <div className="timeline" style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px dashed var(--line-color)' }}>
                {/* Job 1: CampusAdda */}
                <div className="timeline-item" style={{ marginBottom: '4rem', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        left: '-2.6rem',
                        top: '0.5rem',
                        width: '1rem',
                        height: '1rem',
                        background: '#e53935',
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        boxShadow: '0 0 0 2px #e53935'
                    }}></div>

                    <span className="tech-note" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Feb 2025 - Present</span>
                    <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Technical Team ➝ Outreach Intern</h2>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '1rem' }}>CampusAdda Pvt Ltd</h3>
                    <p style={{ lineHeight: '1.8', color: 'var(--text-color)', fontWeight: '600', fontSize: '1.05rem' }}>
                        Promoted from Technical Team Member to the Outreach Team (Internship).
                        Acted as the Point of Contact (POC) for partner outlets, coordinating feature requirements and resolving critical issues.
                    </p>

                    {/* Certificate Attachment */}
                    <div style={{ marginTop: '1.5rem', filter: 'drop-shadow(2px 4px 6px rgba(0,0,0,0.2))' }}>
                        <div
                            style={{
                                background: '#fff',
                                padding: '0.5rem 0.5rem 1rem 0.5rem',
                                transform: 'rotate(1.5deg)',
                                display: 'inline-block',
                                border: '1px solid #ddd',
                                cursor: 'pointer'
                            }}
                            onClick={() => setSelectedImg({ src: "/ca.jpeg", alt: "CampusAdda Internship" })}
                        >
                            <div style={{
                                width: '40px',
                                height: '20px',
                                background: '#e53935',
                                margin: '-1.2rem auto 0.5rem auto',
                                position: 'relative',
                                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)'
                            }}></div>
                            <img
                                src="/ca.jpeg"
                                alt="Internship Certificate"
                                style={{ height: '140px', width: 'auto', minWidth: '200px', display: 'block', background: '#f0f0f0', objectFit: 'contain', border: '1px solid #eee' }}
                            />
                            <p style={{ textAlign: 'center', fontSize: '0.8rem', marginTop: '0.5rem', color: '#333', fontFamily: 'var(--font-heading)' }}>OFFICIAL RECORD</p>
                        </div>
                    </div>
                </div>

                {/* Job 2: GDG */}
                <div className="timeline-item" style={{ marginBottom: '4rem', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        left: '-2.6rem',
                        top: '0.5rem',
                        width: '1rem',
                        height: '1rem',
                        background: '#333',
                        borderRadius: '50%',
                        border: '2px solid #fff'
                    }}></div>

                    <span className="tech-note" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Dec 2024 - 2025</span>
                    <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>Web Dev Team</h2>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--text-color)', marginBottom: '1rem' }}>Google Developer Groups (GDG) - Manipal University Jaipur</h3>
                    <p style={{ lineHeight: '1.8' }}>
                        Built and maintained frontend pages for GDG events using HTML, CSS, JavaScript, and React.
                        Ensuring the community looks good online.
                    </p>
                </div>
            </div>

            {/* Skills Inventory */}
            <div id="skills" style={{ margin: '4rem 0', scrollMarginTop: '8rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', transform: 'rotate(1deg)' }}>
                    <span style={{ borderBottom: '3px solid var(--text-color)', paddingBottom: '0.5rem' }}>Inventory & Skills</span>
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    border: '2px solid var(--text-color)',
                    padding: '2rem',
                    borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                    background: 'transparent'
                }}>
                    {/* Languages */}
                    <div>
                        <h3 style={{ borderBottom: '1px dashed var(--text-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Languages</h3>
                        <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '1.1rem' }}>
                            {['Python', 'C/C++', 'JavaScript (ES6+)', 'TypeScript', 'Dart'].map(skill => (
                                <li key={skill}>✓ {skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Frameworks */}
                    <div>
                        <h3 style={{ borderBottom: '1px dashed var(--text-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Frameworks</h3>
                        <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '1.1rem' }}>
                            {['React & Next.js', 'Flutter', 'Node.js', 'TailwindCSS'].map(skill => (
                                <li key={skill}>✓ {skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Tools & DB */}
                    <div>
                        <h3 style={{ borderBottom: '1px dashed var(--text-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>Tools & Data</h3>
                        <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '1.1rem' }}>
                            {['PostgreSQL', 'MongoDB', 'Supabase', 'Git & GitHub', 'Playwright & Automation'].map(skill => (
                                <li key={skill}>✓ {skill}</li>
                            ))}
                        </ul>
                    </div>

                    {/* AI & Prototyping */}
                    <div>
                        <h3 style={{ borderBottom: '1px dashed var(--text-color)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-color)' }}>AI & Prototyping</h3>
                        <ul style={{ listStyle: 'none', lineHeight: '2', fontSize: '1.1rem' }}>
                            {['Claude & Copilot', 'v0.dev & Lovable', 'Cursor IDE', 'Antigravity'].map(skill => (
                                <li key={skill}>✓ {skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div style={{ marginTop: '5rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', transform: 'rotate(-1deg)' }}>
                    <span style={{ borderBottom: '3px solid #333', paddingBottom: '0.5rem' }}>Achievements & Trophies</span>
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', justifyContent: 'center' }}>

                    {/* Achievement 1: Scam-a-thon */}
                    <div
                        className="polaroid"
                        style={{ width: '280px', transform: 'rotate(-2deg)', background: '#fff', padding: '1rem', paddingBottom: '3rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/scamathon.jpg", alt: "Scam-a-thon Winner" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/scamathon.jpg"
                            alt="Scam-a-thon Winner"
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.3rem' }}>Scam-a-thon Winner</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555', marginTop: '0.5rem', lineHeight: '1.4' }}>
                            1st Place • SL-Security <br /> Simulated Phishing Defense
                        </p>
                    </div>

                    {/* Achievement 2: GSSoC */}
                    <div
                        className="polaroid"
                        style={{ width: '280px', transform: 'rotate(2deg)', background: '#fff', padding: '1rem', paddingBottom: '3rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/gssoc.jpg", alt: "GSSoC '24" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/gssoc.jpg"
                            alt="GSSoC '24"
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.3rem' }}>GSSoC '24</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555', marginTop: '0.5rem', lineHeight: '1.4' }}>
                            GirlScript Summer of Code <br /> Open Source Contributor <br /> Rank: 479
                        </p>
                    </div>

                    {/* Achievement 3: MUJ hackx*/}
                    <div
                        className="polaroid"
                        style={{ width: '280px', transform: 'rotate(2deg)', background: '#fff', padding: '1rem', paddingBottom: '3rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/hackx.jpeg", alt: "MUJ hackx" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/hackx.jpeg"
                            alt="MUJ hackx"
                            style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '1rem', textAlign: 'center', fontSize: '1.3rem' }}>GSSoC '24</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#555', marginTop: '0.5rem', lineHeight: '1.4' }}>
                            Finalist MUJ HackX 3.0
                        </p>
                    </div>

                </div>
            </div>

            <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
                <TactileButton label="Download Full Resume" href="/resume.pdf" external />
            </div>
        </section>
    );
}

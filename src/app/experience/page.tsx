"use client";
import React, { useState } from 'react';
import TactileButton from "@/components/TactileButton";
import ImageViewer from "@/components/ImageViewer";
import { SiMeta, SiGithub } from "react-icons/si";
import { GoGitPullRequest } from "react-icons/go";

// High-Fidelity Enamel & Brass Pushpin Component
const Pushpin = () => (
    <svg className="card-pushpin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="7" r="5.5" fill="#e53935" />
        <circle cx="10" cy="5" r="1.5" fill="rgba(255, 255, 255, 0.75)" />
        <path d="M8.5 12.5 L15.5 12.5 L12 7 Z" fill="#c62828" />
        <rect x="11.2" y="12" width="1.6" height="8.5" rx="0.5" fill="#b0bec5" />
    </svg>
);


export default function Experience() {
    const [selectedImg, setSelectedImg] = useState<{ src: string, alt: string } | null>(null);

    return (
        <section className="section" style={{ maxWidth: '960px', margin: '0 auto', position: 'relative' }}>
            <ImageViewer
                isOpen={!!selectedImg}
                src={selectedImg?.src || ''}
                alt={selectedImg?.alt || ''}
                onClose={() => setSelectedImg(null)}
            />
            <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>
                <span className="pinned-paper">Field Logs</span>
            </h1>
            <p style={{ marginBottom: '3rem', textAlign: 'center', fontSize: '1.2rem', color: '#666' }}>
                Chronicles of professional adventures & side quests.
            </p>

            {/* 2-Column Experience Grid: Timeline on Left, Highlights & Credentials on Right */}
            <div className="experience-layout-grid">
                {/* Left Column: Timeline Items */}
                <div className="timeline" style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '2px dashed var(--line-color)' }}>
                    {/* Job 1: Software Development Cell */}
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

                        <span className="tech-note" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Mar 2025 - Present</span>
                        <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Software Development Intern</h2>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '1rem' }}>Software Development Cell, Manipal University Jaipur</h3>
                        <p style={{ lineHeight: '1.7', color: 'var(--text-color)', fontWeight: '600', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                            Contributing to a production-grade system serving 2000+ students.
                        </p>
                        <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.7', fontSize: '1.05rem' }}>
                            <li>Worked on backend logic including access control and allocation workflows.</li>
                            <li>Improved reliability and scalability under concurrent usage.</li>
                        </ul>
                    </div>

                    {/* Job 2: CampusAdda */}
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

                        <span className="tech-note" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>Feb 2025 - Mar 2026</span>
                        <h2 style={{ marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Technical Team ➝ Outreach Intern</h2>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--text-color)', marginBottom: '1rem' }}>CampusAdda Pvt Ltd</h3>
                        <p style={{ lineHeight: '1.8', color: 'var(--text-color)', fontWeight: '600', fontSize: '1.05rem' }}>
                            Promoted from Technical Team Member to the Outreach Team (Internship).
                            Acted as the Point of Contact (POC) for partner outlets, coordinating feature requirements and resolving critical issues.
                        </p>
                    </div>

                    {/* Job 3: GDG */}
                    <div className="timeline-item" style={{ position: 'relative' }}>
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

                {/* Right Column: Meta Open Source Credential Card (Tactile Notebook Dispatch) */}
                <div className="experience-sidebar">
                    <div className="meta-credential-card">
                        <Pushpin />
                        
                        {/* Header Badge */}
                        <div className="card-header-badge">
                            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.65 }}>
                                Open Source
                            </span>
                            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-inter), sans-serif", fontWeight: 700, letterSpacing: "0.05em", color: "#0081fb", textTransform: "uppercase" }}>
                                10+ pr's merged
                            </span>
                        </div>

                        {/* Organization Branding & Role */}
                        <div style={{ marginTop: "0.2rem" }}>
                            <div style={{ fontSize: "0.95rem", color: "var(--secondary-text)", fontFamily: "var(--font-inter), sans-serif", fontWeight: 600 }}>
                                Official Contributor
                            </div>
                            <h4 style={{ fontSize: "1.45rem", fontWeight: 900, display: "flex", alignItems: "center", marginTop: "0.25rem", color: "var(--text-color)", fontFamily: "var(--font-inter), sans-serif" }}>
                                <SiMeta size={24} color="#0081fb" style={{ display: 'inline-block', verticalAlign: '-3px', marginRight: '8px', flexShrink: 0 }} /> Meta
                            </h4>
                        </div>

                        {/* Interactive Repository Chip */}
                        <div style={{ marginTop: "1rem" }}>
                            <div style={{ fontSize: "0.8rem", color: "var(--secondary-text)", marginBottom: "0.3rem", fontFamily: "var(--font-inter), sans-serif", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>Upstream Contributions:</span>
                                <span style={{ fontSize: "0.75rem", fontFamily: "ui-monospace, monospace", color: "var(--secondary-text)", opacity: 0.85 }}>@Geervan</span>
                            </div>
                            <a
                                href="https://github.com/facebook/astryx/commits?author=Geervan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="meta-repo-chip"
                                title="View Geervan's merged commits in facebook/astryx on GitHub"
                            >
                                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <SiGithub size={15} style={{ opacity: 0.85, flexShrink: 0 }} />
                                    <span>facebook/astryx</span>
                                </span>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.78rem", color: "#0081fb", fontWeight: 700 }}>
                                    <span>commits</span>
                                    <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>↗</span>
                                </span>
                            </a>
                        </div>

                        {/* Footer Status Pill */}
                        <div className="pr-stats-box">
                            <span style={{ display: "flex", alignItems: "center", opacity: 0.8, fontSize: "0.82rem", fontFamily: "var(--font-inter), sans-serif" }}>
                                <GoGitPullRequest size={14} style={{ marginRight: '5px', verticalAlign: '-2px' }} /> Upstream
                            </span>
                            <span style={{ color: "#0081fb", fontWeight: 700, display: "inline-flex", alignItems: "center", fontSize: "0.82rem", fontFamily: "var(--font-inter), sans-serif" }}>
                                Official Contributor
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div style={{ marginTop: '6rem' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '3rem', transform: 'rotate(-1deg)' }}>
                    <span style={{ borderBottom: '3px solid var(--text-color)', paddingBottom: '0.5rem' }}>Achievements & Trophies</span>
                </h2>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>

                    {/* Achievement 1: Scam-a-thon */}
                    <div
                        className="polaroid"
                        style={{ width: '210px', transform: 'rotate(-2deg)', background: '#fff', padding: '0.8rem', paddingBottom: '2.5rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/scamathon.jpg", alt: "Scam-a-thon Winner" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/scamathon.jpg"
                            alt="Scam-a-thon Winner"
                            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '0.8rem', textAlign: 'center', fontSize: '1.1rem' }}>Scam-a-thon Winner</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginTop: '0.4rem', lineHeight: '1.4' }}>
                            1st Place • SL-Security <br /> Simulated Phishing Defense
                        </p>
                    </div>

                    {/* Achievement 2: GSSoC */}
                    <div
                        className="polaroid"
                        style={{ width: '210px', transform: 'rotate(2deg)', background: '#fff', padding: '0.8rem', paddingBottom: '2.5rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/gssoc.jpg", alt: "GSSoC '24" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/gssoc.jpg"
                            alt="GSSoC '24"
                            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '0.8rem', textAlign: 'center', fontSize: '1.1rem' }}>GSSoC '24</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginTop: '0.4rem', lineHeight: '1.4' }}>
                            GirlScript Summer of Code <br /> Open Source Contributor <br /> Rank: 479
                        </p>
                    </div>

                    {/* Achievement 3: MUJ hackx*/}
                    <div
                        className="polaroid"
                        style={{ width: '210px', transform: 'rotate(2deg)', background: '#fff', padding: '0.8rem', paddingBottom: '2.5rem', boxSizing: 'content-box', boxShadow: '2px 4px 6px rgba(0,0,0,0.3)', position: 'relative', cursor: 'pointer' }}
                        onClick={() => setSelectedImg({ src: "/hackx.jpeg", alt: "MUJ hackx" })}
                    >
                        <div className="tape" style={{ left: '35%', top: '-15px' }}></div>
                        <img
                            src="/hackx.jpeg"
                            alt="MUJ hackx"
                            style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '2px', border: '1px solid #ddd', background: '#f0f0f0', display: 'block' }}
                        />
                        <h3 style={{ marginTop: '0.8rem', textAlign: 'center', fontSize: '1.1rem' }}>MUJ HackX 3.0</h3>
                        <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#555', marginTop: '0.4rem', lineHeight: '1.4' }}>
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

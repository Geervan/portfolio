"use client";
import React from 'react';

export default function Skills() {
    const skillCategories = [
        {
            title: "Languages",
            skills: ['Python', 'C/C++', 'JavaScript (ES6+)', 'TypeScript', 'Dart'],
            rotation: "-1.5deg"
        },
        {
            title: "Frameworks",
            skills: ['React & Next.js', 'Flutter', 'Node.js', 'TailwindCSS'],
            rotation: "1deg"
        },
        {
            title: "Tools & Data",
            skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'Git & GitHub', 'Playwright & Automation'],
            rotation: "-1deg"
        },
        {
            title: "AI & Prototyping",
            skills: ['Claude & Copilot', 'v0.dev & Lovable', 'Cursor IDE', 'Antigravity'],
            rotation: "1.5deg"
        }
    ];

    return (
        <section className="section" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '6rem' }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h1 style={{ marginBottom: '1rem' }}>
                    <span className="pinned-paper">Technical Skills</span>
                </h1>
                <p style={{ fontSize: "1.3rem", marginTop: "1rem", color: "var(--secondary-text)" }}>
                    Languages, frameworks, and developer gear in my technical inventory.
                </p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: '3rem',
                marginTop: '2rem'
            }}>
                {skillCategories.map((category, index) => (
                    <div
                        key={index}
                        style={{
                            border: '2px solid var(--text-color)',
                            padding: '2.5rem',
                            borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px',
                            background: 'transparent',
                            transform: `rotate(${category.rotation})`,
                            boxShadow: '3px 3px 0px var(--text-color)'
                        }}
                    >
                        <h2 style={{

                            marginTop: 0,
                            borderBottom: '2px dashed var(--line-color)',
                            paddingBottom: '0.5rem',
                            marginBottom: '1.5rem',
                            fontSize: '1.8rem',
                            fontFamily: 'var(--font-heading)'
                        }}>
                            {category.title}
                        </h2>
                        <ul style={{ listStyle: 'none', lineHeight: '2.2', fontSize: '1.2rem', padding: 0 }}>
                            {category.skills.map(skill => (
                                <li key={skill} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span style={{ color: 'var(--text-color)', fontWeight: 'bold' }}>✓</span> {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}

"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/experience", label: "Experience" },
        { href: "/gallery", label: "Gallery" },
        { href: "/about", label: "About me" },
        { href: "/contact", label: "Contact" },
    ];

    const handleHover = (label: string | null) => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('nav-hover', { detail: label }));
        }
    };

    return (
        <nav className="navbar" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Desktop Navigation */}
            <ul className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', flexWrap: 'wrap', alignItems: 'center' }}>
                {links.map(link => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="nav-link"
                            onMouseEnter={() => handleHover(link.label)}
                            onMouseLeave={() => handleHover(null)}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li><a
                    href="/resume.pdf"
                    target="_blank"
                    className="resume-btn-3d"
                    onMouseEnter={() => handleHover('Resume')}
                    onMouseLeave={() => handleHover(null)}
                >Resume</a></li>
            </ul>

            {/* Mobile Toggle Button (Visible only on mobile via CSS) */}
            <button
                className="mobile-toggle nav-link"
                onClick={() => setIsOpen(true)}
                aria-label="Open Menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}
            >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8 L28 8" />
                    <path d="M4 16 L28 16" />
                    <path d="M4 24 L28 24" />
                </svg>
            </button>

            {/* Mobile Menu Drawer */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                    <button
                        onClick={() => setIsOpen(false)}
                        aria-label="Close Menu"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)' }}
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 7 L25 25" />
                            <path d="M25 7 L7 25" />
                        </svg>
                    </button>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                    {links.map(link => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="nav-link"
                                style={{ fontSize: '1.5rem' }}
                                onMouseEnter={() => handleHover(link.label)}
                                onMouseLeave={() => handleHover(null)}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li><a
                        href="/resume.pdf"
                        target="_blank"
                        className="resume-btn-3d"
                        style={{ marginTop: '1rem' }}
                        onMouseEnter={() => handleHover('Resume')}
                        onMouseLeave={() => handleHover(null)}
                    >Resume</a></li>
                </ul>
            </div>
        </nav>
    );
}

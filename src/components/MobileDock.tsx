"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaShapes, FaCode, FaEnvelope, FaFilePdf } from "react-icons/fa";

export default function MobileDock() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/", icon: <FaHome /> },
        { name: "Projects", href: "/projects", icon: <FaShapes /> },
        { name: "Skills", href: "/skills", icon: <FaCode /> },
        { name: "Contact", href: "/contact", icon: <FaEnvelope /> },
        { name: "Resume", href: "/resume.pdf", icon: <FaFilePdf />, target: "_blank" },
    ];

    return (
        <nav className="mobile-dock">
            {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`dock-item ${isActive ? "active" : ""}`}
                        style={{ position: 'relative' }} // Ensure positioning context
                        target={link.target}
                        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    >
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {isActive && <div className="active-dot" />}
                            <span className="dock-icon">{link.icon}</span>
                        </div>
                        <span className="dock-label">{link.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
}

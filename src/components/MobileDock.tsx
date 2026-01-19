"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaShapes, FaBriefcase, FaEnvelope, FaUser } from "react-icons/fa";

export default function MobileDock() {
    const pathname = usePathname();

    const links = [
        { name: "Home", href: "/", icon: <FaHome /> },
        { name: "Projects", href: "/projects", icon: <FaShapes /> },
        { name: "Exp", href: "/experience", icon: <FaBriefcase /> },
        { name: "About", href: "/about", icon: <FaUser /> },
        { name: "Contact", href: "/contact", icon: <FaEnvelope /> },
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
                    >
                        <span className="dock-icon">{link.icon}</span>
                        <span className="dock-label">{link.name}</span>
                        {isActive && <div className="active-dot" />}
                    </Link>
                );
            })}
        </nav>
    );
}

import Link from 'next/link';
import React from 'react';

interface Props {
    label: string;
    href?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
    external?: boolean;
}

export default function TactileButton({ label, href, onClick, type = "button", className, external }: Props) {
    if (href) {
        if (external) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" className={`tactile-btn ${className || ''}`}>
                    {label}
                </a>
            )
        }
        return (
            <Link href={href} className={`tactile-btn ${className || ''}`}>
                {label}
            </Link>
        );
    }
    return (
        <button type={type} onClick={onClick} className={`tactile-btn ${className || ''}`}>
            {label}
        </button>
    );
}

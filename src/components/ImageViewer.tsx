"use client";
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageViewerProps {
    src: string;
    alt: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function ImageViewer({ src, alt, isOpen, onClose }: ImageViewerProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !mounted) return null;

    const content = (
        <div
            onClick={onClose}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.90)', // Darker background
                zIndex: 2147483647, // Max Z-Index
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                backdropFilter: 'blur(5px)'
            }}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    position: 'relative',
                    maxWidth: '90vw',
                    maxHeight: '90vh',
                }}
            >
                {/* Image */}
                <img
                    src={src}
                    alt={alt}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '85vh',
                        objectFit: 'contain',
                        border: '10px solid #fff',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                        borderRadius: '2px'
                    }}
                />

                {/* Close Button - Hand Drawn Style */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-20px',
                        width: '40px',
                        height: '40px',
                        background: '#e53935',
                        border: '2px solid #fff',
                        borderRadius: '50%',
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                    }}
                >
                    ✕
                </button>

                {/* Caption */}
                <div style={{
                    position: 'absolute',
                    bottom: '-40px',
                    left: '0',
                    width: '100%',
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                }}>
                    {alt}
                </div>
            </div>
        </div>
    );

    // Use Portal to attach directly to body, bypassing any parent stacking contexts
    return createPortal(content, document.body);
}

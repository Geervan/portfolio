"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-github-calendar/tooltips.css';

const GitHubCalendar = dynamic<any>(
    () => import('react-github-calendar').then(m => m.GitHubCalendar),
    { ssr: false }
);

export default function GithubGraph() {
    // GitHub's classic green palette — exact same as github.com
    const explicitTheme = {
        light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
        dark:  ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <div style={{
            marginTop: '5rem',
            width: '100%',
            position: 'relative',
            clear: 'both',
        }}>
            {/* Ruled lines (desk surface) */}
            <div style={{
                borderTop: '2px solid var(--text-color)',
                borderBottom: '1px dashed var(--line-color)',
                padding: '2.5rem 0 1rem 0',
                position: 'relative',
            }}>
                {/* Section label — like a margin note */}
                <span style={{
                    position: 'absolute',
                    top: '-13px',
                    left: '0',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.85rem',
                    background: 'var(--bg-color)',
                    paddingRight: '1rem',
                    color: 'var(--secondary-text)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                }}>
                    Developer Activity
                </span>

                {/* Title — handwritten feel, left-aligned */}
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 'normal',
                    marginBottom: '2rem',
                    transform: 'rotate(-0.4deg)',
                    color: 'var(--text-color)',
                }}>
                    GitHub Contributions →  Last 12 Months
                </h3>

                {/* Calendar */}
                <div style={{
                    overflowX: 'auto',
                    width: '100%',
                }}>
                    <GitHubCalendar
                        username="geervan"
                        theme={explicitTheme}
                        showTooltip
                        blockSize={13}
                        blockMargin={4}
                        fontSize={13}
                        style={{ fontFamily: 'var(--font-heading)' }}
                    />
                </div>
            </div>

            {/* Bottom ruled line */}
            <div style={{
                borderBottom: '2px solid var(--text-color)',
                marginBottom: '0.5rem',
            }} />
        </div>
    );
}

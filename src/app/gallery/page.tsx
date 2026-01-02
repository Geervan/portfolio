"use client";
import { useState } from 'react';
import TactileButton from "@/components/TactileButton";
import ImageViewer from "@/components/ImageViewer";

export default function Gallery() {
    const [selectedImg, setSelectedImg] = useState<{ src: string, alt: string } | null>(null);

    return (
        <section className="section">
            <ImageViewer
                isOpen={!!selectedImg}
                src={selectedImg?.src || ''}
                alt={selectedImg?.alt || ''}
                onClose={() => setSelectedImg(null)}
            />

            <h1>Gallery</h1>
            <p style={{ marginBottom: '2rem' }}>Get to know the person behind the screen!</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '3rem', marginTop: '2rem' }}>

                {/* Photo 1 */}
                <div
                    className="polaroid"
                    style={{ transform: 'rotate(-2deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/food.jpeg", alt: "Food" })}
                >
                    <div className="tape" style={{ left: '30%', top: '-15px' }}></div>
                    <img src="/food.jpeg" alt="Hackathon" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>A Yum Yum Treat</p>
                </div>

                {/* Photo 2 */}
                <div
                    className="polaroid"
                    style={{ transform: 'rotate(2deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/boat.jpeg", alt: "Boating" })}
                >
                    <div className="tape" style={{ left: '40%', top: '-10px', transform: 'rotate(10deg)' }}></div>
                    <img src="/boat.jpeg" alt="Coding" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>A peaceful Boat ride in Udaipur</p>
                    <div className="ink-splatter" style={{ bottom: '-10px', right: '-10px', opacity: 0.5 }}></div>
                </div>

                {/* Photo 3 */}
                <div
                    className="polaroid"
                    style={{ transform: 'rotate(-1deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/messy.jpeg", alt: "Hardware" })}
                >
                    <div className="tape" style={{ left: '20%', top: '-12px', transform: 'rotate(-5deg)' }}></div>
                    <img src="/messy.jpeg" alt="Setup" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>The Raquet itself wasnt working so Harvested the Led lmaoooo</p>
                </div>

                {/* Photo 4 */}
                <div
                    className="polaroid"
                    style={{ transform: 'rotate(3deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/plen.jpeg", alt: "Team Lunch" })}
                >
                    <div className="tape" style={{ left: '50%', top: '-15px' }}></div>
                    <img src="/plen.jpeg" alt="Team" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>Saw this beauty of an IL-76 while returning to college from vacay</p>
                </div>

                <div
                    className="polaroid"
                    style={{ transform: 'rotate(3deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/assam.jpeg", alt: "Assam" })}
                >
                    <div className="tape" style={{ left: '50%', top: '-15px' }}></div>
                    <img src="/assam.jpeg" alt="Team" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>Hard to believe that this is in India, Assam btw ✌️</p>
                </div>

                <div
                    className="polaroid"
                    style={{ transform: 'rotate(3deg)', cursor: 'pointer' }}
                    onClick={() => setSelectedImg({ src: "/jaipur.jpeg ", alt: "Team Lunch" })}
                >
                    <div className="tape" style={{ left: '50%', top: '-15px' }}></div>
                    <img src="/jaipur.jpeg" alt="Team" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block', borderRadius: '2px', filter: 'grayscale(20%)' }} />
                    <p style={{ textAlign: 'center', marginTop: '1rem', fontFamily: 'var(--font-heading)' }}>Jaipur at night ❤️</p>
                </div>

                
            </div>
        </section>
    );
}

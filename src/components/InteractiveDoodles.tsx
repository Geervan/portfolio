"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

interface Doodle {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    type: "gear" | "stickman" | "cube" | "bracket" | "arrow" | "bulb" | "star" | "laptop" | "can" | "cloud" | "coffee" | "books";
    motionAngle: number;
    motionLen: number;
    xPercent?: number;
    yPercent?: number;
}

export default function InteractiveDoodles() {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMoveRef = useRef(Date.now());
    const doodleRef = useRef<Doodle[]>([]);
    const hoveredNavRef = useRef<string | null>(null);
    const isSurprisedRef = useRef(false);
    const showWelcomeRef = useRef(true);
    const spotifyDataRef = useRef<{ title: string; artist: string; isPlaying: boolean } | null>(null);
    const idleActivityRef = useRef<"music" | "coffee">("music");
    const wasIdleRef = useRef(false);

    // Fetch Spotify Status periodically
    useEffect(() => {
        const fetchSpotify = async () => {
            try {
                const res = await fetch("/api/spotify");
                if (res.ok) {
                    const data = await res.json();
                    spotifyDataRef.current = data;
                }
            } catch {
                // Keep default fallback
            }
        };

        fetchSpotify();
        const interval = setInterval(fetchSpotify, 15000);
        return () => clearInterval(interval);
    }, []);

    // Fade out welcome bubble after 6 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            showWelcomeRef.current = false;
        }, 6000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleNavHover = (e: any) => {
            hoveredNavRef.current = e.detail;
        };
        // @ts-ignore
        window.addEventListener('nav-hover', handleNavHover);
        return () => {
            // @ts-ignore
            window.removeEventListener('nav-hover', handleNavHover);
        }
    }, []);

    useEffect(() => {
        const initialDoodles: Doodle[] = [];
        const types: Doodle["type"][] = ["gear", "cube", "bracket", "arrow", "bulb", "star", "laptop", "can", "cloud", "books", "coffee"];

        // 35 background doodles scattered across the entire window
        for (let i = 0; i < 35; i++) {
            const xPercent = Math.random();
            const yPercent = Math.random();
            initialDoodles.push({
                id: i,
                x: xPercent * window.innerWidth,
                y: yPercent * window.innerHeight,
                type: types[Math.floor(Math.random() * types.length)],
                rotation: Math.random() * 360,
                scale: 0.7 + Math.random() * 0.7,
                motionAngle: 0,
                motionLen: 0,
                xPercent,
                yPercent
            });
        }

        // The Stickman Hero
        initialDoodles.push({
            id: 999,
            x: window.innerWidth - 145,
            y: window.innerHeight - 95,
            type: 'stickman',
            rotation: 0,
            scale: 1.3,
            motionAngle: 0,
            motionLen: 0
        });

        doodleRef.current = initialDoodles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            lastMoveRef.current = Date.now();
        };
        window.addEventListener("mousemove", handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Recalculate positions based on viewport dimensions
            doodleRef.current.forEach((d) => {
                if (d.id === 999) {
                    d.x = window.innerWidth - 145;
                    d.y = window.innerHeight - 95;
                } else if (d.xPercent !== undefined && d.yPercent !== undefined) {
                    d.x = window.innerWidth * d.xPercent;
                    d.y = window.innerHeight * d.yPercent;
                }
            });
        };
        window.addEventListener("resize", resize);

        resize();

        const drawShape = (ctx: CanvasRenderingContext2D, type: Doodle["type"]) => {
            if (type === 'gear') {
                ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    ctx.rotate(Math.PI / 3); ctx.moveTo(8, -5); ctx.lineTo(12, -5); ctx.lineTo(12, 5); ctx.lineTo(8, 5);
                }
                ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.stroke();
            } else if (type === 'cube') {
                ctx.strokeRect(-10, -10, 20, 20); ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(-15, -15); ctx.moveTo(10, -10); ctx.lineTo(15, -15); ctx.moveTo(10, 10); ctx.lineTo(15, 5); ctx.moveTo(-10, 10); ctx.lineTo(-15, 5); ctx.moveTo(-15, -15); ctx.lineTo(15, -15); ctx.lineTo(15, 5); ctx.lineTo(-15, 5); ctx.lineTo(-15, -15); ctx.stroke();
            } else if (type === 'bracket') {
                ctx.beginPath(); ctx.moveTo(10, -15); ctx.lineTo(0, -15); ctx.lineTo(0, 15); ctx.lineTo(10, 15); ctx.stroke();
            } else if (type === 'arrow') {
                ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(15, 0); ctx.moveTo(10, -5); ctx.lineTo(15, 0); ctx.lineTo(10, 5); ctx.stroke();
            } else if (type === 'bulb') {
                ctx.beginPath(); ctx.arc(0, -8, 10, 0, Math.PI * 2); ctx.moveTo(-4, -5); ctx.lineTo(0, -8); ctx.lineTo(4, -5); ctx.rect(-4, 2, 8, 6); ctx.stroke();
            } else if (type === 'star') {
                ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(2, -2); ctx.lineTo(10, 0); ctx.lineTo(2, 2); ctx.lineTo(0, 10); ctx.lineTo(-2, 2); ctx.lineTo(-10, 0); ctx.lineTo(-2, -2); ctx.closePath(); ctx.stroke();
            } else if (type === 'laptop') {
                ctx.strokeRect(-12, -8, 24, 16); ctx.strokeRect(-15, 8, 30, 2); ctx.beginPath(); ctx.moveTo(-8, -4); ctx.lineTo(0, -4); ctx.moveTo(-8, 0); ctx.lineTo(4, 0); ctx.moveTo(-8, 4); ctx.lineTo(-2, 4); ctx.stroke();
            } else if (type === 'can') {
                ctx.beginPath(); ctx.ellipse(0, -10, 8, 3, 0, 0, Math.PI * 2); ctx.moveTo(-8, -10); ctx.lineTo(-8, 10); ctx.moveTo(8, -10); ctx.lineTo(8, 10); ctx.ellipse(0, 10, 8, 3, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1, -5); ctx.lineTo(-2, 0); ctx.lineTo(2, 0); ctx.lineTo(-1, 5); ctx.stroke();
            } else if (type === 'cloud') {
                ctx.beginPath(); ctx.arc(-10, 0, 8, Math.PI * 0.5, Math.PI * 1.5); ctx.arc(0, -8, 10, Math.PI * 1, Math.PI * 2); ctx.arc(10, 0, 8, Math.PI * 1.5, Math.PI * 0.5); ctx.closePath(); ctx.stroke();
            } else if (type === 'books') {
                ctx.strokeRect(-12, 5, 24, 6); ctx.strokeRect(-10, -1, 20, 6); ctx.strokeRect(-14, -7, 28, 6);
            } else if (type === 'coffee') {
                ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-8, 8); ctx.bezierCurveTo(-8, 12, 8, 12, 8, 8); ctx.lineTo(8, -8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, -4); ctx.bezierCurveTo(12, -4, 12, 4, 8, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-3, -12); ctx.lineTo(-3, -16); ctx.moveTo(3, -12); ctx.lineTo(3, -16); ctx.stroke();
            }
        };

        let animationId: number;
        let time = 0;

        const drawDoodle = (ctx: CanvasRenderingContext2D, d: Doodle, isNear: boolean, isSurprised: boolean, isIdle: boolean) => {
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate((d.rotation * Math.PI) / 180);
            ctx.scale(d.scale, d.scale);

            // Faint style for background
            ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            if (d.type === 'stickman') {
                ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

                const navHover = hoveredNavRef.current;
                const isResume = navHover === 'Resume';

                // Head
                ctx.beginPath();
                ctx.arc(0, -20, 10, 0, Math.PI * 2);
                ctx.stroke();

                // Eyes
                const dx = mouseRef.current.x - d.x;
                const dy = mouseRef.current.y - d.y;
                const angle = Math.atan2(dy, dx);
                const eyeOffset = 2;

                ctx.fillStyle = theme === 'dark' ? '#fff' : '#333';
                ctx.beginPath();
                ctx.arc(-4 + Math.cos(angle) * eyeOffset, -20 + Math.sin(angle) * eyeOffset, 1.5, 0, Math.PI * 2);
                ctx.arc(4 + Math.cos(angle) * eyeOffset, -20 + Math.sin(angle) * eyeOffset, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Body & Legs
                ctx.beginPath();
                if (isResume) {
                    ctx.moveTo(0, -10); ctx.lineTo(0, 15);
                    ctx.moveTo(0, 15); ctx.lineTo(15, 15);
                    ctx.lineTo(15, 35);
                } else {
                    ctx.moveTo(0, -10); ctx.lineTo(0, 20);
                    ctx.moveTo(0, 20); ctx.lineTo(-10, 40);
                    ctx.moveTo(0, 20); ctx.lineTo(10, 40);
                }
                ctx.stroke();

                // Arms & Text
                ctx.beginPath();

                if (isResume) {
                    const typeSpeed = time * 0.5;
                    const typeOffset = Math.sin(typeSpeed) * 2;
                    ctx.moveTo(0, -5); ctx.lineTo(15, 5 + typeOffset);
                    ctx.moveTo(0, -5); ctx.lineTo(22, 5 - typeOffset);
                    ctx.stroke();

                    ctx.strokeStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(10, 10); ctx.lineTo(45, 10);
                    ctx.moveTo(40, 10); ctx.lineTo(40, 35);
                    ctx.stroke();

                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(25, 10); ctx.lineTo(32, -8); ctx.lineTo(42, -8); ctx.lineTo(35, 10);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(15, 10); ctx.lineTo(35, 10);
                    ctx.stroke();

                    ctx.fillStyle = '#e53935';
                    ctx.beginPath();
                    ctx.moveTo(0, -10); ctx.lineTo(-3, 0); ctx.lineTo(0, 5); ctx.lineTo(3, 0); ctx.fill();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Ooh going to the resume", -130, -50);
                    ctx.fillText("gotta be professional!", -120, -35);

                } else if (navHover && navHover !== 'Home') {
                    if (navHover === 'Projects') {
                        ctx.moveTo(0, -5); ctx.lineTo(15, 0);
                        ctx.moveTo(0, -5); ctx.lineTo(-10, 10);
                        ctx.stroke();
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(15, 0); ctx.lineTo(25, -10);
                        ctx.moveTo(22, -13); ctx.lineTo(28, -7);
                        ctx.stroke();
                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("Let's Build!", -60, -40);
                    } else if (navHover === 'Gallery') {
                        ctx.moveTo(0, -5); ctx.lineTo(10, -5);
                        ctx.moveTo(0, -5); ctx.lineTo(5, 0);
                        ctx.stroke();
                        ctx.strokeRect(8, -8, 12, 8);
                        ctx.beginPath(); ctx.arc(14, -4, 3, 0, Math.PI * 2); ctx.stroke();
                        
                        // Flashing camera bulb animation (fires for 10 frames, recharges for 50 frames)
                        const flashCycle = time % 60;
                        if (flashCycle < 10) {
                            ctx.save();
                            ctx.strokeStyle = "#ffeb3b";
                            ctx.lineWidth = 1.5;
                            ctx.beginPath();
                            ctx.moveTo(8, -8); ctx.lineTo(3, -13);
                            ctx.moveTo(8, -8); ctx.lineTo(8, -15);
                            ctx.moveTo(8, -8); ctx.lineTo(13, -13);
                            ctx.stroke();
                            
                            ctx.fillStyle = "#ffffff";
                            ctx.shadowColor = "#ffeb3b";
                            ctx.shadowBlur = 8;
                            ctx.beginPath();
                            ctx.arc(8, -8, 2, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.restore();
                        }

                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("Say Cheese!", -60, -40);
                    } else if (navHover === 'Contact') {
                        ctx.moveTo(0, -5); ctx.lineTo(15, -5);
                        ctx.moveTo(0, -5); ctx.lineTo(0, 10);
                        ctx.stroke();
                        ctx.strokeRect(15, -10, 14, 10);
                        ctx.beginPath(); ctx.moveTo(15, -10); ctx.lineTo(22, -3); ctx.lineTo(29, -10); ctx.stroke();
                        
                        // Red wax seal detail
                        ctx.save();
                        ctx.beginPath();
                        ctx.arc(22, -3, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = "#e53935"; // wax seal red
                        ctx.fill();
                        ctx.restore();

                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("Hmu!", -30, -40);
                    } else if (navHover === 'Experience') {
                        ctx.moveTo(0, -5); ctx.lineTo(15, -10);
                        ctx.moveTo(0, -5); ctx.lineTo(-10, 10);
                        ctx.stroke();
                        ctx.save();
                        ctx.translate(20, -15);
                        ctx.scale(0.5, 0.5);
                        
                        // Yellow glowing star
                        ctx.fillStyle = "#ffeb3b";
                        ctx.strokeStyle = "#ffd600";
                        ctx.shadowColor = "#ffeb3b";
                        ctx.shadowBlur = 8;
                        
                        ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(2, -2); ctx.lineTo(10, 0); ctx.lineTo(2, 2); ctx.lineTo(0, 10); ctx.lineTo(-2, 2); ctx.lineTo(-10, 0); ctx.lineTo(-2, -2); ctx.closePath(); 
                        ctx.fill();
                        ctx.stroke();
                        
                        ctx.restore();
                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("The Grind.", -50, -40);
                    } else if (navHover === 'Skills') {
                        ctx.moveTo(0, -5); ctx.lineTo(15, -5);
                        ctx.moveTo(0, -5); ctx.lineTo(-10, 10);
                        ctx.stroke();
                        ctx.save();
                        ctx.translate(22, -5);
                        ctx.scale(0.6, 0.6);
                        
                        // Arc Reactor Glow
                        ctx.strokeStyle = "#00d2ff";
                        ctx.shadowColor = "#00f0ff";
                        ctx.shadowBlur = 10;
                        
                        ctx.beginPath();
                        for (let i = 0; i < 6; i++) {
                            ctx.rotate(Math.PI / 3); ctx.moveTo(6, -4); ctx.lineTo(9, -4); ctx.lineTo(9, 4); ctx.lineTo(6, 4);
                        }
                        ctx.arc(0, 0, 6, 0, Math.PI * 2); ctx.stroke();
                        
                        // Reactor Core
                        ctx.beginPath();
                        ctx.arc(0, 0, 2, 0, Math.PI * 2);
                        ctx.fillStyle = "#ffffff";
                        ctx.shadowBlur = 5;
                        ctx.fill();
                        ctx.stroke();
                        
                        ctx.restore();
                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("My Arsenal!", -50, -40);
                    } else if (navHover === 'About me') {
                        ctx.moveTo(0, -5); ctx.lineTo(-5, -15);
                        ctx.moveTo(0, -5); ctx.lineTo(10, 10);
                        ctx.stroke();
                        ctx.font = '14px "Patrick Hand", sans-serif';
                        ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                        ctx.fillText("It's me!", -40, -40);
                    }
                } else if (isSurprised) {
                    ctx.moveTo(0, -5); ctx.lineTo(-25, 5);
                    ctx.moveTo(0, -5); ctx.lineTo(25, 5);
                    ctx.stroke();
                    ctx.beginPath(); ctx.arc(0, -15, 2, 0, Math.PI * 2); ctx.stroke();
                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Hey hey dont hurt me!", -70, -45);

                } else if (showWelcomeRef.current) {
                    // Welcome Waving Pose
                    ctx.moveTo(0, -5); ctx.lineTo(-10, 15);
                    const waveAngle = Math.sin(time * 0.15) * 0.3;
                    ctx.moveTo(0, -5);
                    ctx.lineTo(Math.cos(-Math.PI / 3 + waveAngle) * 20, Math.sin(-Math.PI / 3 + waveAngle) * 20);
                    ctx.stroke();

                    // Speech bubble frame (ends earlier on the right to avoid screen edge clipping)
                    ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                    ctx.lineWidth = 1.2;
                    ctx.beginPath();
                    ctx.strokeRect(-114, -56, 174, 26);
                    ctx.moveTo(-10, -32);
                    ctx.lineTo(0, -24);
                    ctx.lineTo(10, -32);
                    ctx.stroke();

                    // Welcome phrase text (13px font)
                    ctx.font = '13px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Welcome to Geervan's portfolio", -107, -40);

                } else if (isIdle && idleActivityRef.current === 'music') {
                    // 🎧 Spotify Music Jamming with Headphones
                    const bpm = time * 0.12;
                    const armGroove = Math.sin(bpm) * 4;

                    // Draw Over-Ear Headphones
                    ctx.save();
                    ctx.strokeStyle = '#1db954'; // Spotify vibrant green
                    ctx.lineWidth = 2.2;
                    ctx.beginPath();
                    ctx.arc(0, -20, 12.5, Math.PI * 0.95, Math.PI * 2.05);
                    ctx.stroke();

                    // Headphone Earcups
                    ctx.fillStyle = '#1db954';
                    ctx.beginPath();
                    ctx.roundRect(-13.5, -24, 4, 8, 2);
                    ctx.roundRect(9.5, -24, 4, 8, 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.restore();

                    // Grooving Arms
                    ctx.moveTo(0, -5); ctx.lineTo(-14, 5 + armGroove);
                    ctx.moveTo(0, -5); ctx.lineTo(14, 5 - armGroove);
                    ctx.stroke();

                    // Compact Spotify Mini-Player Bubble
                    const song = spotifyDataRef.current;
                    const songTitle = song?.title || "Starboy";
                    const songArtist = song?.artist || "The Weeknd";
                    const isPlaying = song?.isPlaying;
                    const statusLabel = isPlaying ? "Listening to:" : "Last Played:";


                    // Measure exact text width to fit full title without overflow
                    ctx.font = 'bold 12px "Patrick Hand", sans-serif';
                    const titleWidth = ctx.measureText(songTitle).width;
                    ctx.font = '10.5px "Patrick Hand", sans-serif';
                    const artistWidth = ctx.measureText(songArtist).width;
                    const bubbleWidth = Math.max(150, Math.max(titleWidth, artistWidth) + 24);
                    
                    // Account for d.scale (1.3) so the right edge is strictly >= 30px inside the window
                    const scale = d.scale || 1.3;
                    const maxRightScaled = ((window.innerWidth - 30) - d.x) / scale;
                    const bubbleX = Math.min(-bubbleWidth / 2, maxRightScaled - bubbleWidth);
                    const bubbleY = -92;
                    const bubbleHeight = 48;

                    // Pointer position along the bottom of the bubble
                    const pointerX = Math.max(bubbleX + 14, Math.min(bubbleX + bubbleWidth - 14, 0));


                    // Solid background fill so background content/photos never clash
                    ctx.save();
                    ctx.fillStyle = theme === 'dark' ? '#252528' : '#ffffff';
                    ctx.fillRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight);
                    ctx.beginPath();
                    ctx.moveTo(pointerX - 5, bubbleY + bubbleHeight);
                    ctx.lineTo(0, -35);
                    ctx.lineTo(pointerX + 5, bubbleY + bubbleHeight);
                    ctx.closePath();
                    ctx.fill();

                    // Sketchy outline & pointer
                    ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)';
                    ctx.lineWidth = 1.3;
                    ctx.strokeRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight);
                    ctx.beginPath();
                    ctx.moveTo(pointerX - 5, bubbleY + bubbleHeight);
                    ctx.lineTo(0, -35);
                    ctx.lineTo(pointerX + 5, bubbleY + bubbleHeight);
                    ctx.stroke();
                    ctx.restore();

                    // Line 1: Header (🎧 Listening to / Last Played)
                    ctx.font = '10.5px "Patrick Hand", sans-serif';
                    ctx.fillStyle = '#1db954';
                    ctx.fillText(`🎧 ${statusLabel}`, bubbleX + 10, bubbleY + 14);

                    // Line 2: Song Title (Bold)
                    ctx.font = 'bold 12px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText(songTitle, bubbleX + 10, bubbleY + 29);

                    // Line 3: Artist Name (Subtle)
                    ctx.font = '10.5px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#aaa' : '#666';
                    ctx.fillText(songArtist, bubbleX + 10, bubbleY + 42);

                    // Floating Animated Blue Music Notes (♪ ♫) placed prominently on sides
                    const note1Y = -12 - ((time * 0.6) % 24);
                    const note1X = 22 + Math.sin(time * 0.08) * 3;
                    const note1Alpha = Math.max(0.15, 1 - ((-12 - note1Y) / 24));

                    ctx.save();
                    ctx.fillStyle = `rgba(0, 163, 255, ${note1Alpha})`;
                    ctx.font = 'bold 16px sans-serif';
                    ctx.fillText('♪', note1X, note1Y);

                    const note2Y = -8 - (((time + 12) * 0.6) % 24);
                    const note2X = -28 + Math.cos(time * 0.08) * 3;
                    const note2Alpha = Math.max(0.15, 1 - ((-8 - note2Y) / 24));
                    ctx.fillStyle = `rgba(0, 163, 255, ${note2Alpha})`;
                    ctx.fillText('♫', note2X, note2Y);
                    ctx.restore();







                } else if (isIdle) {
                    // ☕ Coffee Sip (Preserved in code)
                    ctx.moveTo(0, -5); ctx.lineTo(-10, 5);
                    ctx.moveTo(0, -5); ctx.lineTo(12, -10);
                    ctx.stroke();
                    ctx.save();
                    ctx.translate(15, -12);
                    ctx.scale(0.5, 0.5);
                    ctx.rotate(-0.2);
                    ctx.beginPath(); ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                    ctx.moveTo(-8, -8); ctx.lineTo(-8, 8); ctx.bezierCurveTo(-8, 12, 8, 12, 8, 8); ctx.lineTo(8, -8); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(8, -4); ctx.bezierCurveTo(12, -4, 12, 4, 8, 4); ctx.stroke();
                    ctx.restore();
                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Ooh Coffee!", -60, -35);

                } else {
                    ctx.moveTo(0, -5); ctx.lineTo(-5, 15);
                    ctx.moveTo(0, -5); ctx.lineTo(5, 15);
                    ctx.stroke();
                }
            } else {
                // Background Doodles
                drawShape(ctx, d.type);
            }
            ctx.restore();
        };

        const update = () => {
            time++;
            const now = Date.now();
            const timeSinceMove = now - lastMoveRef.current;
            const isIdle = timeSinceMove > 4000;

            // Always display music on idle
            if (isIdle) {
                idleActivityRef.current = "music";
            }
            wasIdleRef.current = isIdle;


            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            doodleRef.current.forEach((d) => {
                if (d.type === 'stickman') {
                    let isNear = false;
                    let isSurprised = false;
                    const dx = mx - d.x;
                    const dy = my - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    isNear = dist < 200;
                    if (isSurprisedRef.current) {
                        isSurprised = dist < 120;
                    } else {
                        isSurprised = dist < 60;
                    }
                    isSurprisedRef.current = isSurprised;
                    drawDoodle(ctx, d, isNear, isSurprised, isIdle);
                } else {
                    // Background doodles stay completely static
                    drawDoodle(ctx, d, false, false, isIdle);
                }
            });

            animationId = requestAnimationFrame(update);
        };

        update();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="interactive-doodles"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 10
            }}
        />
    );
}

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
}

export default function InteractiveDoodles() {
    const { theme } = useTheme();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const lastMoveRef = useRef(Date.now());
    const doodleRef = useRef<Doodle[]>([]);
    const hoveredNavRef = useRef<string | null>(null);

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

        // Populate Background with STATIC doodles
        // Increased density for "messy" look
        for (let i = 0; i < 40; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            initialDoodles.push({
                id: i,
                x: x,
                y: y,
                type: types[Math.floor(Math.random() * types.length)],
                rotation: Math.random() * 360,
                scale: 0.8 + Math.random() * 0.8
            });
        }

        // The Stickman Hero - distinct location
        initialDoodles.push({
            id: 999,
            x: window.innerWidth - 120,
            y: window.innerHeight - 100,
            type: 'stickman',
            rotation: 0,
            scale: 1.3
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
            lastMoveRef.current = Date.now(); // Reset idle timer
        };
        window.addEventListener("mousemove", handleMouseMove);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        let animationId: number;
        let time = 0;

        const drawDoodle = (ctx: CanvasRenderingContext2D, d: Doodle, isNear: boolean, isSurprised: boolean, isIdle: boolean) => {
            ctx.save();
            ctx.translate(d.x, d.y);
            ctx.rotate((d.rotation * Math.PI) / 180);
            ctx.scale(d.scale, d.scale);

            // Faint style for background
            ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
            ctx.lineWidth = 2;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            if (d.type === 'stickman') {
                // Hero is more visible
                ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';

                const navHover = hoveredNavRef.current;
                const isResume = navHover === 'Resume';

                // 1. Head
                ctx.beginPath();
                ctx.arc(0, -20, 10, 0, Math.PI * 2);
                ctx.stroke();

                // 2. Eyes (Tracking)
                const dx = mouseRef.current.x - d.x;
                const dy = mouseRef.current.y - d.y;
                const angle = Math.atan2(dy, dx);
                const eyeOffset = 2;

                ctx.fillStyle = theme === 'dark' ? '#fff' : '#333';
                ctx.beginPath();
                // Left Eye
                ctx.arc(-4 + Math.cos(angle) * eyeOffset, -20 + Math.sin(angle) * eyeOffset, 1.5, 0, Math.PI * 2);
                // Right Eye
                ctx.arc(4 + Math.cos(angle) * eyeOffset, -20 + Math.sin(angle) * eyeOffset, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // 3. Body & Legs
                ctx.beginPath();
                if (isResume) {
                    // Sitting Pose
                    ctx.moveTo(0, -10); ctx.lineTo(0, 15); // Shorter Body
                    // Legs (sitting)
                    ctx.moveTo(0, 15); ctx.lineTo(15, 15); // Thighs
                    ctx.lineTo(15, 35); // Shins
                } else {
                    // Standing
                    ctx.moveTo(0, -10); ctx.lineTo(0, 20); // Body
                    ctx.moveTo(0, 20); ctx.lineTo(-10, 40); // L Leg
                    ctx.moveTo(0, 20); ctx.lineTo(10, 40); // R Leg
                }
                ctx.stroke();

                // 4. Arms, Props & Text
                ctx.beginPath();

                if (isResume) {
                    // Resume Logic (Typing)
                    const typeSpeed = time * 0.5;
                    const typeOffset = Math.sin(typeSpeed) * 2;
                    ctx.moveTo(0, -5); ctx.lineTo(15, 5 + typeOffset);
                    ctx.moveTo(0, -5); ctx.lineTo(22, 5 - typeOffset);
                    ctx.stroke();

                    // Desk & Laptop
                    ctx.strokeStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(10, 10); ctx.lineTo(45, 10); // Table top
                    ctx.moveTo(40, 10); ctx.lineTo(40, 35); // Table Leg
                    ctx.stroke();

                    // Laptop
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(25, 10); ctx.lineTo(32, -8); ctx.lineTo(42, -8); ctx.lineTo(35, 10); // Screen
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(15, 10); ctx.lineTo(35, 10); // Base
                    ctx.stroke();

                    // Tie
                    ctx.fillStyle = '#e53935';
                    ctx.beginPath();
                    ctx.moveTo(0, -10); ctx.lineTo(-3, 0); ctx.lineTo(0, 5); ctx.lineTo(3, 0); ctx.fill();

                    // Text
                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Ooh going to the resume", -130, -50);
                    ctx.fillText("gotta be professional!", -120, -35);

                } else if (navHover === 'Projects') {
                    // Hammer
                    ctx.moveTo(0, -5); ctx.lineTo(15, 0); // R Arm holding
                    ctx.moveTo(0, -5); ctx.lineTo(-10, 10); // L Arm down
                    ctx.stroke();

                    // Draw Hammer
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(15, 0); ctx.lineTo(25, -10); // Handle
                    ctx.moveTo(22, -13); ctx.lineTo(28, -7); // Head box
                    ctx.stroke();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Let's Build!", -60, -40);

                } else if (navHover === 'Gallery') {
                    // Camera
                    ctx.moveTo(0, -5); ctx.lineTo(10, -5); // R Arm
                    ctx.moveTo(0, -5); ctx.lineTo(5, 0); // L Arm
                    ctx.stroke();

                    // Camera Box
                    ctx.strokeRect(8, -8, 12, 8);
                    ctx.beginPath(); ctx.arc(14, -4, 3, 0, Math.PI * 2); ctx.stroke(); // Lens

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Say Cheese!", -60, -40);

                } else if (navHover === 'Contact') {
                    // Envelope
                    ctx.moveTo(0, -5); ctx.lineTo(15, -5);
                    ctx.moveTo(0, -5); ctx.lineTo(0, 10);
                    ctx.stroke();

                    // Envelope Rect
                    ctx.strokeRect(15, -10, 14, 10);
                    ctx.beginPath(); ctx.moveTo(15, -10); ctx.lineTo(22, -3); ctx.lineTo(29, -10); ctx.stroke();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Hmu!", -30, -40);

                } else if (navHover === 'Experience') {
                    // Star
                    ctx.moveTo(0, -5); ctx.lineTo(15, -10);
                    ctx.moveTo(0, -5); ctx.lineTo(-10, 10);
                    ctx.stroke();

                    // Draw Star
                    ctx.save();
                    ctx.translate(20, -15);
                    ctx.scale(0.5, 0.5);
                    ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(2, -2); ctx.lineTo(10, 0); ctx.lineTo(2, 2); ctx.lineTo(0, 10); ctx.lineTo(-2, 2); ctx.lineTo(-10, 0); ctx.lineTo(-2, -2); ctx.closePath(); ctx.stroke();
                    ctx.restore();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("The Grind.", -50, -40);

                } else if (navHover === 'About me') {
                    // Point at self
                    ctx.moveTo(0, -5); ctx.lineTo(-5, -15); // Thumb pointing self
                    ctx.moveTo(0, -5); ctx.lineTo(10, 10);
                    ctx.stroke();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("It's me!", -40, -40);

                } else if (navHover === 'Home') {
                    // Simply waving
                    const wave = Math.sin(time * 0.2) * 20;
                    ctx.moveTo(0, -5); ctx.lineTo(-15, 0 + wave);
                    ctx.moveTo(0, -5); ctx.lineTo(15, 10);
                    ctx.stroke();

                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Back to Base", -60, -40);

                } else if (isSurprised) {
                    ctx.moveTo(0, -5); ctx.lineTo(-20, -15); // L Arm Up
                    ctx.moveTo(0, -5); ctx.lineTo(20, -15); // R Arm Up
                    ctx.stroke();

                    // Mouth O
                    ctx.beginPath(); ctx.arc(0, -15, 2, 0, Math.PI * 2); ctx.stroke();
                    // Text
                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Hey hey dont hurt me,", -80, -60);
                    ctx.fillText("but welcome to Geervan's portfolio!", -110, -45);

                } else if (isIdle) {
                    ctx.moveTo(0, -5); ctx.lineTo(-10, 5); // L Arm Relaxed
                    ctx.moveTo(0, -5); ctx.lineTo(12, -10); // R Arm Holding Cup
                    ctx.stroke();

                    // Draw Cup
                    ctx.save();
                    ctx.translate(15, -12);
                    ctx.scale(0.5, 0.5);
                    ctx.rotate(-0.2);
                    ctx.beginPath(); ctx.strokeStyle = theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)';
                    ctx.moveTo(-8, -8); ctx.lineTo(-8, 8); ctx.bezierCurveTo(-8, 12, 8, 12, 8, 8); ctx.lineTo(8, -8); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(8, -4); ctx.bezierCurveTo(12, -4, 12, 4, 8, 4); ctx.stroke();
                    ctx.restore();

                    // Coffee Bubble
                    ctx.font = '14px "Patrick Hand", sans-serif';
                    ctx.fillStyle = theme === 'dark' ? '#fff' : '#000';
                    ctx.fillText("Ooh Coffee!", -60, -35);

                } else {
                    // Neutral Standing (No Wave)
                    ctx.moveTo(0, -5); ctx.lineTo(-5, 15); // L Arm down
                    ctx.moveTo(0, -5); ctx.lineTo(5, 15); // R Arm down
                    ctx.stroke();
                }

            } else {
                // Other shapes (simplified drawing logic reused)
                if (d.type === 'gear') {
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        ctx.rotate(Math.PI / 3); ctx.moveTo(8, -5); ctx.lineTo(12, -5); ctx.lineTo(12, 5); ctx.lineTo(8, 5);
                    }
                    ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.stroke();
                } else if (d.type === 'cube') {
                    ctx.strokeRect(-10, -10, 20, 20); ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(-15, -15); ctx.moveTo(10, -10); ctx.lineTo(15, -15); ctx.moveTo(10, 10); ctx.lineTo(15, 5); ctx.moveTo(-10, 10); ctx.lineTo(-15, 5); ctx.moveTo(-15, -15); ctx.lineTo(15, -15); ctx.lineTo(15, 5); ctx.lineTo(-15, 5); ctx.lineTo(-15, -15); ctx.stroke();
                } else if (d.type === 'bracket') {
                    ctx.beginPath(); ctx.moveTo(10, -15); ctx.lineTo(0, -15); ctx.lineTo(0, 15); ctx.lineTo(10, 15); ctx.stroke();
                } else if (d.type === 'arrow') {
                    ctx.beginPath(); ctx.moveTo(-15, 0); ctx.lineTo(15, 0); ctx.moveTo(10, -5); ctx.lineTo(15, 0); ctx.lineTo(10, 5); ctx.stroke();
                } else if (d.type === 'bulb') {
                    ctx.beginPath(); ctx.arc(0, -8, 10, 0, Math.PI * 2); ctx.moveTo(-4, -5); ctx.lineTo(0, -8); ctx.lineTo(4, -5); ctx.rect(-4, 2, 8, 6); ctx.stroke();
                } else if (d.type === 'star') {
                    ctx.beginPath(); ctx.moveTo(0, -10); ctx.lineTo(2, -2); ctx.lineTo(10, 0); ctx.lineTo(2, 2); ctx.lineTo(0, 10); ctx.lineTo(-2, 2); ctx.lineTo(-10, 0); ctx.lineTo(-2, -2); ctx.closePath(); ctx.stroke();
                } else if (d.type === 'laptop') {
                    ctx.strokeRect(-12, -8, 24, 16); ctx.strokeRect(-15, 8, 30, 2); ctx.beginPath(); ctx.moveTo(-8, -4); ctx.lineTo(0, -4); ctx.moveTo(-8, 0); ctx.lineTo(4, 0); ctx.moveTo(-8, 4); ctx.lineTo(-2, 4); ctx.stroke();
                } else if (d.type === 'can') {
                    ctx.beginPath(); ctx.ellipse(0, -10, 8, 3, 0, 0, Math.PI * 2); ctx.moveTo(-8, -10); ctx.lineTo(-8, 10); ctx.moveTo(8, -10); ctx.lineTo(8, 10); ctx.ellipse(0, 10, 8, 3, 0, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(1, -5); ctx.lineTo(-2, 0); ctx.lineTo(2, 0); ctx.lineTo(-1, 5); ctx.stroke();
                } else if (d.type === 'cloud') {
                    ctx.beginPath(); ctx.arc(-10, 0, 8, Math.PI * 0.5, Math.PI * 1.5); ctx.arc(0, -8, 10, Math.PI * 1, Math.PI * 2); ctx.arc(10, 0, 8, Math.PI * 1.5, Math.PI * 0.5); ctx.closePath(); ctx.stroke();
                } else if (d.type === 'books') {
                    ctx.strokeRect(-12, 5, 24, 6); ctx.strokeRect(-10, -1, 20, 6); ctx.strokeRect(-14, -7, 28, 6);
                } else if (d.type === 'coffee') {
                    ctx.beginPath(); ctx.moveTo(-8, -8); ctx.lineTo(-8, 8); ctx.bezierCurveTo(-8, 12, 8, 12, 8, 8); ctx.lineTo(8, -8); ctx.stroke(); ctx.beginPath(); ctx.moveTo(8, -4); ctx.bezierCurveTo(12, -4, 12, 4, 8, 4); ctx.stroke(); ctx.beginPath(); ctx.moveTo(-3, -12); ctx.lineTo(-3, -16); ctx.moveTo(3, -12); ctx.lineTo(3, -16); ctx.stroke();
                }
            }

            ctx.restore();
        };

        const update = () => {
            time++;
            const now = Date.now();
            const timeSinceMove = now - lastMoveRef.current;
            const isIdle = timeSinceMove > 4000; // 4 Seconds Idle

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            doodleRef.current.forEach((d) => {
                let isNear = false;
                let isSurprised = false;

                if (d.type === 'stickman') {
                    const dx = mx - d.x;
                    const dy = my - d.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    isNear = dist < 150; // Show speech bubble range
                    isSurprised = dist < 60; // Personal space invasion!
                }

                drawDoodle(ctx, d, isNear, isSurprised, isIdle);
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

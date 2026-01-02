"use client";

import TactileButton from "@/components/TactileButton";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");

        try {
            const res = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <section className="section" style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px' }}>
                <h1>Contact</h1>
                <p style={{ marginBottom: '2rem' }}>Send me a note.</p>

                {status === "success" ? (
                    <div style={{
                        padding: '2rem',
                        border: '2px dashed #4caf50',
                        borderRadius: '10px',
                        color: '#4caf50',
                        textAlign: 'center',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        transform: 'rotate(-1deg)'
                    }}>
                        ✓ Message sent! I'll get back to you soon.
                        <br />
                        <button
                            onClick={() => setStatus('idle')}
                            style={{ marginTop: '1rem', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', color: 'inherit' }}
                        >
                            Send another?
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="notebook-label" htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="notebook-input"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label className="notebook-label" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="notebook-input"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label className="notebook-label" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                className="notebook-input"
                                rows={4}
                                placeholder="What's on your mind?"
                                style={{ resize: 'vertical' }}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <TactileButton
                            label={status === 'submitting' ? 'Sending...' : 'Send note'}
                            type="submit"
                        />
                        {status === 'error' && <p style={{ color: 'red', marginTop: '1rem' }}>Oops! Something went wrong. Try again?</p>}
                    </form>
                )}
            </div>

            {/* Right Side Sticky Note */}
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="sticky-note" style={{ transform: 'rotate(2deg)', padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid #333' }}>Find me elsewhere</h3>
                    <ul style={{ listStyle: 'none', fontSize: '1.2rem', lineHeight: '1.8' }}>
                        <li>
                            <a href="https://github.com/geervan" target="_blank" style={{ textDecoration: 'underline' }}>GitHub &rarr;</a>
                        </li>
                        <li>
                            <a href="https://linkedin.com/in/geervan" target="_blank" style={{ textDecoration: 'underline' }}>Linkedin &rarr;</a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/geervan_09/" target="_blank" style={{ textDecoration: 'underline' }}>Instagram  &rarr;</a>
                        </li>
                    </ul>
                    <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
                        (I reply faster on emails tbh)
                    </p>
                </div>
            </div>
        </section>
    );
}

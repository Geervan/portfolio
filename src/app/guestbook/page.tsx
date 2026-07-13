"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Caveat, Indie_Flower, Permanent_Marker } from "next/font/google";

// Load Google handwriting fonts for randomized look
const caveat = Caveat({ subsets: ["latin"], weight: "400" });
const indieFlower = Indie_Flower({ subsets: ["latin"], weight: "400" });
const permanentMarker = Permanent_Marker({ subsets: ["latin"], weight: "400" });

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  color: "yellow" | "blue" | "pink" | "green";
  font?: "patrick" | "caveat" | "indie" | "marker";
  createdAt: string;
}

// Pushpin SVG Component
const Pushpin = ({ id }: { id: string }) => {
  // Deterministic pin color based on ID
  const pinColors = ["#ef5350", "#42a5f5", "#66bb6a", "#ffca28"]; // red, blue, green, orange-yellow
  const charSum = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const color = pinColors[charSum % pinColors.length];

  return (
    <svg className="pushpin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Plastic round pin cap */}
      <circle cx="12" cy="8" r="5" fill={color} />
      <circle cx="10.5" cy="6.5" r="1.5" fill="rgba(255, 255, 255, 0.5)" /> {/* Highlight */}
      <path d="M9 13.5 L15 13.5 L12 8 Z" fill={color} />
      {/* Metal needle stick */}
      <rect x="11.4" y="13" width="1.2" height="7" rx="0.3" fill="#cfd8dc" />
    </svg>
  );
};

export default function GuestbookPage() {
  const [mounted, setMounted] = useState(false);
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState<"yellow" | "blue" | "pink" | "green">("yellow");
  const [font, setFont] = useState<"patrick" | "caveat" | "indie" | "marker">("patrick");
  const [honeypot, setHoneypot] = useState(""); // Bot spam trap

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal open states
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Admin delete states
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [adminPassword, setAdminPassword] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Corkboard ref for Framer Motion drag constraints
  const boardRef = useRef<HTMLDivElement>(null);

  // Fetch guestbook entries
  const fetchEntries = async () => {
    try {
      const res = await fetch("/api/guestbook");
      if (res.ok) {
        const data = await res.json();
        setEntries(data);
      }
    } catch (err) {
      console.error("Failed to load entries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchEntries();
    // Add page class to body to hide the mobile dock on this page
    document.body.classList.add("guestbook-page");
    return () => {
      document.body.classList.remove("guestbook-page");
    };
  }, []);

  // Lock body scroll when the form popup is open (position:fixed needed for iOS)
  useEffect(() => {
    if (isFormOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isFormOpen]);

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!message.trim()) {
      setErrorMsg("Write a message first!");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
          color,
          font,
          honeypot, // hidden spam trap
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Clear message & close modal
        setMessage("");
        setName("");
        setFont("patrick");
        setIsFormOpen(false);

        // Prepend new entry
        if (data.entry) {
          setEntries((prev) => [data.entry, ...prev]);
        }

        // Show temporary alert banner
        setSuccessMsg("Scribble pinned successfully! 📌");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error || "Failed to pin note.");
      }
    } catch (err) {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete entry handler
  const handleDeleteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deleteTargetId) return;

    setDeleteError(null);
    setDeleting(true);

    try {
      const res = await fetch("/api/guestbook", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: deleteTargetId,
          password: adminPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Remove from UI list
        setEntries((prev) => prev.filter((entry) => entry.id !== deleteTargetId));
        setDeleteTargetId(null);
        setAdminPassword("");
      } else {
        setDeleteError(data.error || "Wrong admin password.");
      }
    } catch (err) {
      setDeleteError("Failed to delete entry.");
    } finally {
      setDeleting(false);
    }
  };

  // Get font styling class based on entry's saved font selection
  const getHandwritingFontClass = (entry: GuestbookEntry) => {
    if (entry.font === "caveat") return caveat.className;
    if (entry.font === "indie") return indieFlower.className;
    if (entry.font === "marker") return permanentMarker.className;
    return ""; // Patrick Hand (default)
  };

  // Get deterministic tilt degree based on entry id
  const getRotation = (id: string) => {
    const sum = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const rotations = [-3, -2, -1.5, -1, 1, 1.5, 2, 3];
    return rotations[sum % rotations.length];
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "1rem 0" }}>
      {/* Header with wobbly back link */}
      <div className="guestbook-header">
        <Link
          href="/"
          className="tactile-btn guestbook-back-btn"
          style={{
            padding: "0.65rem 1.4rem",
            fontSize: "1.05rem",
          }}
        >
          {"<-"} Go Back to Desk
        </Link>

        <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 3.8rem)", margin: 0, textAlign: "center" }}>
          <span className="pinned-paper" style={{ padding: "0.8rem 2.5rem 1rem 2.5rem" }}>
            The Softboard
          </span>
        </h1>
      </div>

      {/* Floating/Action Section: description and writing trigger */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem", marginBottom: "2rem" }}>
        <p style={{ fontSize: "1.4rem", lineHeight: "1.6", margin: 0, maxWidth: "650px" }}>
          Leave a scribble, check in, or say hello! See what others have posted on the softboard.
        </p>
        <button
          onClick={() => {
            setErrorMsg(null);
            setIsFormOpen(true);
          }}
          className="tactile-btn"
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1.25rem",
            backgroundColor: "var(--button-bg)",
            color: "var(--button-text)",
            transform: "rotate(-1.5deg)",
            flexShrink: 0,
          }}
        >
          Write a Scribble! ✍️
        </button>
      </div>

      {/* Global Success Banner (for when notes are pinned successfully) */}
      {successMsg && (
        <div
          style={{
            color: "#388e3c",
            background: "#e8f5e9",
            border: "2px solid #388e3c",
            borderRadius: "4px",
            padding: "0.8rem 1.5rem",
            marginBottom: "1.5rem",
            fontSize: "1.2rem",
            fontFamily: "var(--font-heading)",
            transform: "rotate(0.5deg)",
            boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Corkboard Container (Takes 100% width now) */}
      <div ref={boardRef} style={{ width: "100%" }} className="softboard-container">
        <div className="softboard-bg">
          {loading ? (
            <div style={{ columnSpan: 'all', textAlign: 'center', padding: '3rem 1rem', opacity: 0.5, fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-secondary)', animation: 'pulse 1.5s infinite' }}>
              Reading board notes... 🔍
            </div>
          ) : entries.length === 0 ? (
            <div style={{ columnSpan: 'all', textAlign: 'center', padding: '3rem 1rem', opacity: 0.5, fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--text-secondary)' }}>
              Board is clean! Be the first to pin a scribble here. 📝
            </div>
          ) : (
            <AnimatePresence>
              {entries.map((entry) => {
                const fontClass = getHandwritingFontClass(entry);
                const rot = getRotation(entry.id);

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, scale: 0.8, rotate: rot * 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: rot }}
                    exit={{ opacity: 0, scale: 0.7, y: 30 }}
                    className={`post-it post-it-${entry.color}`}
                    style={{
                      transform: `rotate(${rot}deg)`,
                    }}
                  >
                    {/* Pushpin */}
                    <Pushpin id={entry.id} />

                    {/* Content block */}
                    <div
                      className={fontClass}
                      style={{
                        fontSize: "1.45rem",
                        lineHeight: "1.3",
                        wordBreak: "break-word",
                        marginTop: "0.5rem",
                        flexGrow: 1,
                      }}
                    >
                      "{entry.message}"
                    </div>

                    {/* Footer block */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        marginTop: "0.8rem",
                        borderTop: "1px dashed rgba(0,0,0,0.1)",
                        paddingTop: "0.5rem",
                      }}
                    >
                      <div style={{ opacity: 0.8, fontSize: "0.9rem" }}>
                        — {entry.name}
                      </div>
                      <div style={{ opacity: 0.5, fontSize: "0.75rem" }}>
                        {new Date(entry.createdAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    {/* Admin Eraser/Delete Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Avoid triggering any card click events
                        setDeleteTargetId(entry.id);
                      }}
                      className="admin-delete-btn"
                      title="Eraser (Delete note)"
                      aria-label="Delete note"
                    >
                      {/* Wobbly eraser pencil icon */}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 20H7L3 16C2 15 2 13 3 12L13 2L22 11L20 20Z" />
                        <path d="M17 17L12 12" />
                      </svg>
                    </button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Form Submission Modal Backdrop & Card */}
      {mounted && isFormOpen && createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(3px)",
            overflowY: "auto",
          }}
          onClick={() => setIsFormOpen(false)} // Close modal when clicking backdrop
        >
          <div
            className="scribble-modal-card"
            style={{
              background: "var(--bg-color)",
              color: "var(--text-color)",
              border: "3px solid var(--border-color)",
              borderRadius: "15px 255px 12px 225px / 225px 12px 255px 15px",
              padding: "2.2rem 2rem",
              width: "100%",
              maxWidth: "420px",
              boxShadow: "8px 12px 28px rgba(0,0,0,0.5)",
              transform: "rotate(-1deg)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking card body
          >
            {/* Tape Effect on Form Card */}
            <div className="tape" style={{ top: "-15px", left: "30%", transform: "rotate(-10deg)" }}></div>

            <h3
              style={{
                fontSize: "1.7rem",
                fontFamily: "var(--font-heading)",
                borderBottom: "2px dashed var(--border-color)",
                paddingBottom: "0.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Pin a Scribble 📝
            </h3>

            <form onSubmit={handleSubmit}>
              {/* Honeypot field (hidden from humans) */}
              <input
                type="text"
                name="website"
                className="hp-field"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Name Input */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label className="notebook-label" style={{ fontSize: "1.2rem" }}>
                  Name / Alias (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Stay anonymous or write nickname..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={25}
                  className="notebook-input"
                  style={{
                    fontSize: "1.1rem",
                    padding: "0.8rem",
                    marginBottom: 0,
                    width: "100%",
                  }}
                />
              </div>

              {/* Message Input */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label className="notebook-label" style={{ fontSize: "1.2rem" }}>
                  Message
                </label>
                <textarea
                  placeholder="Type a scribble (max 150 chars)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={150}
                  required
                  rows={4}
                  className="notebook-input"
                  style={{
                    fontSize: "1.1rem",
                    padding: "0.8rem",
                    marginBottom: 0,
                    width: "100%",
                    resize: "none",
                  }}
                />
                <div style={{ textAlign: "right", fontSize: "0.9rem", marginTop: "0.3rem", opacity: 0.7 }}>
                  {message.length}/150
                </div>
              </div>

              {/* Post-it Color Selection */}
              <div style={{ marginBottom: "1.2rem" }}>
                <label className="notebook-label" style={{ fontSize: "1.2rem" }}>
                  Post-it Color
                </label>
                <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
                  {(["yellow", "blue", "pink", "green"] as const).map((c) => {
                    const colors = {
                      yellow: "#fff9c4",
                      blue: "#e1f5fe",
                      pink: "#fce4ec",
                      green: "#e8f5e9",
                    };
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`color-swatch ${color === c ? "selected" : ""}`}
                        style={{
                          backgroundColor: colors[c],
                          border: color === c ? "2px solid var(--border-color)" : "2px solid transparent",
                        }}
                        aria-label={`Select ${c} note color`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Font Style Selection */}
              <div style={{ marginBottom: "1.8rem" }}>
                <label className="notebook-label" style={{ fontSize: "1.2rem" }}>
                  Font Style
                </label>
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                  {[
                    { name: "patrick", label: "Patrick", className: "" },
                    { name: "caveat", label: "Caveat", className: caveat.className },
                    { name: "indie", label: "Indie", className: indieFlower.className },
                    { name: "marker", label: "Marker", className: permanentMarker.className },
                  ].map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => setFont(f.name as any)}
                      className="tactile-btn"
                      style={{
                        padding: "0.3rem 0.8rem",
                        fontSize: "1.05rem",
                        margin: 0,
                        borderWidth: font === f.name ? "2.5px" : "1.5px",
                        transform: font === f.name ? "scale(1.05) rotate(1deg)" : "rotate(-1deg)",
                        boxShadow: font === f.name ? "2px 3px 0px var(--button-text)" : "1px 1px 0px var(--button-text)",
                      }}
                    >
                      <span className={f.className} style={{ pointerEvents: 'none' }}>{f.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alert Messages */}
              {errorMsg && (
                <div
                  style={{
                    color: "#d32f2f",
                    background: "#ffebee",
                    border: "1.5px solid #d32f2f",
                    borderRadius: "4px",
                    padding: "0.5rem 1rem",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons inside modal */}
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="tactile-btn"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    boxShadow: "2px 2px 0px var(--button-text)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="tactile-btn"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  {submitting ? "Pinning..." : "Pin it! 📌"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Admin Password Prompt Overlay (Hand-drawn wobbly modal) */}
      {mounted && deleteTargetId && createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            backdropFilter: "blur(2px)",
          }}
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            style={{
              background: "var(--bg-color)",
              color: "var(--text-color)",
              border: "3px solid var(--border-color)",
              borderRadius: "15px 255px 12px 225px / 225px 12px 255px 15px",
              padding: "2rem",
              width: "100%",
              maxWidth: "400px",
              boxShadow: "8px 12px 24px rgba(0,0,0,0.5)",
              transform: "rotate(-1deg)",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tape decoration */}
            <div className="tape" style={{ top: "-15px", left: "35%" }}></div>

            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "1.5rem",
                borderBottom: "2px dashed var(--border-color)",
                paddingBottom: "0.5rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              Verify Eraser Password 🧽
            </h3>

            <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem", textAlign: "center" }}>
              Please enter the admin password to erase this scribble from the board.
            </p>

            <form onSubmit={handleDeleteSubmit}>
              <div style={{ marginBottom: "1.5rem" }}>
                <input
                  type="password"
                  placeholder="Enter admin password..."
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="notebook-input"
                  required
                  autoFocus
                  style={{
                    fontSize: "1.1rem",
                    padding: "0.8rem",
                    marginBottom: 0,
                    width: "100%",
                  }}
                />
              </div>

              {deleteError && (
                <div
                  style={{
                    color: "#d32f2f",
                    background: "#ffebee",
                    border: "1.5px solid #d32f2f",
                    borderRadius: "4px",
                    padding: "0.5rem",
                    marginBottom: "1rem",
                    fontSize: "1rem",
                    textAlign: "center",
                    fontFamily: "var(--font-heading)",
                  }}
                >
                  {deleteError}
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteTargetId(null);
                    setAdminPassword("");
                    setDeleteError(null);
                  }}
                  className="tactile-btn"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    boxShadow: "2px 2px 0px var(--button-text)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleting}
                  className="tactile-btn"
                  style={{
                    padding: "0.5rem 1rem",
                    fontSize: "1rem",
                    backgroundColor: "#e53935",
                    color: "#ffffff",
                    borderColor: "#b71c1c",
                    boxShadow: "2px 2px 0px #b71c1c",
                  }}
                >
                  {deleting ? "Erasing..." : "Erase! 🧽"}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

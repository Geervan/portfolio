"use client";
import TactileButton from "@/components/TactileButton";

export default function Projects() {
    const projects = [
        {
            title: "Github PR-Bot",
            description: "AI-powered PR review bot that analyzes code changes and generates structured feedback to improve code quality and reduce review effort.",
            tags: ["AI", "Automation", "GitHub API"],
            githubLink: "https://github.com/Geervan/PR-Bot",
            link: "https://github.com/apps/geervan-pr-reviewer",
            image: "/projects/pr-bot.png"
        },
        {
            title: "Cosmos Classroom",
            description: "A 3D web-based learning environment featuring interactive college elements to create an immersive study space. Rapidly prototyped for a hackathon.",
            tags: ["Three.js", "React", "TailwindCSS"],
            link: "https://void-nine-kohl.vercel.app",
            githubLink: "https://github.com/geervan",
            image: "/projects/cosmos.png"
        },
        {
            title: "SpaceBasic Bot",
            description: "Automated bot to streamline hostel housekeeping requests and track attendance data from the Student Management System.",
            tags: ["Python", "Automation", "Playwright", "Discord API"],
            githubLink: "https://github.com/geervan",
            image: "/projects/spacebasic.png"
        },
        {
            title: "Class Item Reminder",
            description: "Flutter-based app (Not a Regular Alarm) with checklist workflows and local notifications to help students never forget their essentials.",
            tags: ["Flutter", "Dart", "Android"],
            githubLink: "https://github.com/geervan/class_reminder",
            link: "https://github.com/Geervan/class_reminder/releases/tag/V.1.0.0",
            image: "/projects/reminder.png"
        }
    ];

    return (
        <section className="section">
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <h1>
                    <span className="pinned-paper">Experiments</span>
                </h1>
                <p style={{ fontSize: "1.3rem", marginTop: "1rem", color: "var(--secondary-text)" }}>
                    A collection of code, chaos, and caffeine-fueled builds.
                </p>
            </div>

            <div className="project-list">
                {projects.map((project: any, index) => (
                    <div key={index} className="project-item" style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Tape Effect */}
                        <div className="tape"></div>

                        {/* Sketchy Image Placeholder */}
                        <div style={{
                            width: '100%',
                            height: '200px',
                            marginBottom: '1rem',
                            border: '1px solid #000',
                            overflow: 'hidden',
                            borderRadius: '2px',
                            backgroundColor: '#000',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <img
                                src={project.image}
                                alt={project.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>

                        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{project.title}</h3>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                            {project.tags.map((tag: string) => (
                                <span key={tag} className="tech-note" style={{ fontSize: '0.8rem' }}>{tag}</span>
                            ))}
                        </div>

                        <p style={{ marginBottom: "1.5rem", lineHeight: "1.6", flex: 1 }}>{project.description}</p>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            {project.link && (
                                <TactileButton label="View Project" href={project.link} external />
                            )}
                            {project.githubLink && (
                                <TactileButton label="GitHub" href={project.githubLink} external />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

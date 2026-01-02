import TactileButton from "@/components/TactileButton";

export default function Links() {
    return (
        <section className="section">
            <h1>Elsewhere</h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start', marginTop: '2rem' }}>
                <TactileButton label="GitHub" href="https://github.com/geervan" external />
                <TactileButton label="LinkedIn" href="https://linkedin.com/in/geervan" external />
                <TactileButton label="Email" href="mailto:geervan@example.com" external />
            </div>
        </section>
    );
}

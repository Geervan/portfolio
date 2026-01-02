import TactileButton from "./TactileButton";

export default function ResumeButton() {
    return (
        <div className="resume-fixed">
            <TactileButton label="Résumé (PDF)" href="/resume.pdf" external className="text-sm px-3 py-1" />
        </div>
    );
}

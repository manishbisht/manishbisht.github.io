import PageShell from "../../components/primitives/PageShell";
import Writing from "../../components/Writing";

export default function WritingPage() {
    return (
        <PageShell
            eyebrow="WRITING"
            title="Things I've thought hard about."
            lede="Long-form notes on engineering systems, performance, and what it actually means to scale a team."
        >
            <Writing standalone />
        </PageShell>
    );
}

import PageShell from "../../components/primitives/PageShell";
import Impact from "../../components/Impact";

export default function ImpactPage() {
    return (
        <PageShell
            eyebrow="ENGINEERING IMPACT"
            title="Numbers that survived a postmortem."
            lede="Production metrics from systems I've owned. Not throwaway demos — these are the receipts."
        >
            <Impact standalone />
        </PageShell>
    );
}

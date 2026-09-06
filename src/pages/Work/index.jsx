import PageShell from "../../components/primitives/PageShell";
import CaseStudies from "../../components/CaseStudies";

export default function WorkPage() {
    return (
        <PageShell
            eyebrow="SELECTED WORK"
            title="Architecture, performance, and shipping at scale."
            lede="Engagements I'd stake a reputation on. Real constraints, real trade-offs, real numbers."
        >
            <CaseStudies standalone />
        </PageShell>
    );
}

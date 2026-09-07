import PageShell from "../../components/primitives/PageShell";
import Testimonials from "../../components/Testimonials";

export default function TestimonialsPage() {
    return (
        <PageShell
            eyebrow="TESTIMONIALS"
            title="People who've shipped with me."
            lede="No marketing copy — quotes lifted verbatim from references and reviews."
        >
            <Testimonials standalone />
        </PageShell>
    );
}

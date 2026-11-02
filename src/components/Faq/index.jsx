import Card from "../primitives/Card";
import CornerMark from "../primitives/CornerMark";
import { FAQ } from "./constants";
import styles from "./style.module.css";

const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
    })),
};

// `<` is escaped so an answer can never close the script tag early.
const schemaJson = JSON.stringify(schema).replace(/</g, "\\u003c");

export default function Faq() {
    return (
        <Card
            as="section"
            id="faq"
            radius="section"
            className={styles.section}
            aria-labelledby="faq-title"
        >
            <CornerMark size={12} opacity={0.5} className={styles.mark} />
            <div className={styles.eyebrow}>FAQ</div>
            <h2 id="faq-title" className={styles.title}>
                Quick answers.
            </h2>

            <dl className={styles.list}>
                {FAQ.map(({ q, a }) => (
                    <div key={q} className={styles.item}>
                        <dt className={styles.q}>{q}</dt>
                        <dd className={styles.a}>{a}</dd>
                    </div>
                ))}
            </dl>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: schemaJson }}
            />
        </Card>
    );
}

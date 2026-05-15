import { TESTIMONIALS } from "./constants";
import styles from "./style.module.css";

const PALETTE = [
    ["var(--accent)", "var(--purple)"],
    ["var(--cyan)", "var(--accent)"],
    ["var(--purple)", "var(--teal)"],
];

const initials = (name) =>
    name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

function TestimonialsGrid() {
    return (
        <div className={styles.grid}>
            {TESTIMONIALS.map((t, i) => (
                <div key={t.name} className={styles.card}>
                    <span className={styles.mark}>&ldquo;</span>
                    <p className={styles.quote}>{t.quote}</p>
                    <div className={styles.attr}>
                        <div
                            className={styles.avatar}
                            style={{
                                background: `linear-gradient(135deg, ${PALETTE[i % 3][0]}, ${PALETTE[i % 3][1]})`,
                            }}
                        >
                            {initials(t.name)}
                        </div>
                        <div>
                            <div className={styles.name}>{t.name}</div>
                            <div className={styles.role}>{t.role}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Testimonials({ standalone = false }) {
    if (standalone) return <TestimonialsGrid />;
    return (
        <section id="testimonials">
            <div className="section-head">
                <div>
                    <div className="eyebrow">TESTIMONIALS</div>
                    <h2>People who&apos;ve shipped with me.</h2>
                </div>
                <p className="lede">
                    No marketing copy — quotes lifted verbatim from references
                    and reviews.
                </p>
            </div>
            <TestimonialsGrid />
        </section>
    );
}

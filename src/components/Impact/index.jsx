import { IMPACT } from "./constants";
import styles from "./style.module.css";

function ImpactGrid() {
    return (
        <div className={styles.grid}>
            {IMPACT.map((t) => (
                <div key={t.label} className={styles.tile}>
                    <div>
                        <div className={styles.label}>{t.label}</div>
                        <div className={styles.value}>
                            {t.value}
                            <span className={styles.unit}>{t.unit}</span>
                        </div>
                        <span
                            className={`${styles.delta} ${styles.deltaSuccess}`}
                        >
                            {t.note}
                        </span>
                    </div>
                    <div className={styles.sub}>{t.sub}</div>
                </div>
            ))}
        </div>
    );
}

export default function Impact({ standalone = false }) {
    if (standalone) return <ImpactGrid />;
    return (
        <section id="impact">
            <div className="section-head">
                <div>
                    <div className="eyebrow">ENGINEERING IMPACT</div>
                    <h2>Numbers that survived a postmortem.</h2>
                </div>
                <p className="lede">
                    Production metrics from systems I&apos;ve owned. Not
                    throwaway demos — these are the receipts.
                </p>
            </div>
            <ImpactGrid />
        </section>
    );
}

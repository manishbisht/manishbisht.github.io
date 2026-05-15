import { CASE_STUDIES } from "./constants";
import styles from "./style.module.css";

function CaseStudyCard({ cs }) {
    return (
        <article className={styles.card}>
            <div>
                <div className={styles.eyebrow}>
                    <span>{cs.eyebrow}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.company}>{cs.company}</span>
                </div>
                <h3 className={styles.title}>{cs.title}</h3>
                <p className={styles.summary}>{cs.summary}</p>
                <div className={styles.tags}>
                    {cs.tags.map((t) => (
                        <span key={t} className="tag">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
            <div className={styles.metrics}>
                {cs.metrics.map((m) => (
                    <div key={m.k} className={styles.metric}>
                        <span className={styles.metricK}>{m.k}</span>
                        <span className={styles.metricV}>{m.v}</span>
                    </div>
                ))}
                <hr className="hairline" style={{ margin: "2px 0" }} />
                <div className={styles.readMore}>
                    Read case study <span>→</span>
                </div>
            </div>
            <span className={styles.arrow}>↗</span>
        </article>
    );
}

function CaseStudiesList() {
    return (
        <div className={styles.list}>
            {CASE_STUDIES.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} />
            ))}
        </div>
    );
}

export default function CaseStudies({ standalone = false }) {
    if (standalone) return <CaseStudiesList />;
    return (
        <section id="work">
            <div className="section-head">
                <div>
                    <div className="eyebrow">
                        <span className="idx">01</span> · SELECTED WORK
                    </div>
                    <h2>
                        Architecture, performance, and the slow art of shipping
                        at scale.
                    </h2>
                </div>
                <p className="lede">
                    Three engagements I&apos;d put on the homepage. The rest
                    live on the writing page.
                </p>
            </div>
            <CaseStudiesList />
        </section>
    );
}

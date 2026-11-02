import { CASE_STUDIES } from "./constants";
import styles from "./style.module.css";

function CaseStudyCard({ cs, headingLevel: Heading = "h3" }) {
    return (
        <article className={styles.card}>
            <div>
                <div className={styles.eyebrow}>
                    <span>{cs.eyebrow}</span>
                    <span className={styles.dot}>·</span>
                    <span className={styles.company}>{cs.company}</span>
                </div>
                <Heading className={styles.title}>{cs.title}</Heading>
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

function CaseStudiesList({ headingLevel }) {
    return (
        <div className={styles.list}>
            {CASE_STUDIES.map((cs) => (
                <CaseStudyCard
                    key={cs.id}
                    cs={cs}
                    headingLevel={headingLevel}
                />
            ))}
        </div>
    );
}

export default function CaseStudies({ standalone = false }) {
    // Standalone, the cards sit directly under the page's h1.
    if (standalone) return <CaseStudiesList headingLevel="h2" />;
    return (
        <section id="work">
            <div className="section-head">
                <div>
                    <div className="eyebrow">SELECTED WORK</div>
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

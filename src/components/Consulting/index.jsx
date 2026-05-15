import { SERVICES } from "./constants";
import styles from "./style.module.css";

function ConsultingContent() {
    return (
        <div className={styles.wrap}>
            <div className={styles.halo} />
            <div className={styles.top}>
                <div>
                    <div className={styles.eyebrow}>07 · ENGAGEMENTS</div>
                    <h2 className={styles.heading}>
                        Engagements,
                        <br />
                        not gigs.
                    </h2>
                    <div className={styles.pillRow}>
                        <span className={styles.pill}>
                            <span
                                className={styles.pillDot}
                                style={{ background: "var(--live)" }}
                            />
                            Available Q3 2026
                        </span>
                        <span className={styles.pill}>
                            <span
                                className={styles.pillDot}
                                style={{ background: "var(--fg-3)" }}
                            />
                            1–2 clients at a time
                        </span>
                        <span className={styles.pill}>
                            <span
                                className={styles.pillDot}
                                style={{ background: "var(--fg-3)" }}
                            />
                            Remote · IST friendly
                        </span>
                    </div>
                </div>
                <div>
                    <p className={styles.lede}>
                        I take a small number of consulting engagements each
                        year — typically with seed–Series B startups that need
                        senior frontend architecture, performance, or
                        developer-productivity help.
                    </p>
                    <p className={styles.lede} style={{ marginTop: 14 }}>
                        Not a freelance marketplace. Not a code-monkey. I write
                        the RFC, work alongside your team, and leave you with
                        something that survives my departure.
                    </p>
                </div>
            </div>
            <div className={styles.services}>
                {SERVICES.map((s, i) => (
                    <div key={s.title} className={styles.service}>
                        <div className={styles.sNum}>0{i + 1}</div>
                        <div className={styles.sTitle}>{s.title}</div>
                        <p className={styles.sDesc}>{s.desc}</p>
                        <div className={styles.sFoot}>
                            <span>TYPICAL DURATION</span>
                            <span className={styles.sFootVal}>
                                {s.duration}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.ctaRow}>
                <p className={styles.note}>
                    Start with a short note describing the problem and a rough
                    timeline. I&apos;ll reply in &lt;24h with whether I&apos;m
                    the right fit — or who is, if I&apos;m not.
                </p>
                <button className={styles.cta}>
                    Start a conversation{" "}
                    <span className={styles.ctaArrow}>↗</span>
                </button>
            </div>
        </div>
    );
}

export default function Consulting({ standalone = false }) {
    if (standalone) return <ConsultingContent />;
    return (
        <section id="consulting">
            <ConsultingContent />
        </section>
    );
}

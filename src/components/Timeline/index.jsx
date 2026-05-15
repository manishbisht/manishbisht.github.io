import { useState } from "react";
import { TIMELINE } from "./constants";
import styles from "./style.module.css";

function TimelineItem({ item, defaultOpen }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className={styles.item}>
            <div
                className={`${styles.node} ${item.current ? styles.nodeCurrent : ""}`}
            />
            <div
                className={`${styles.card} ${open ? styles.cardOpen : ""}`}
                onClick={() => setOpen((o) => !o)}
            >
                <div className={styles.topRow}>
                    <div>
                        <h3 className={styles.company}>
                            {item.company}
                            {item.current && (
                                <span className={styles.currentPill}>Now</span>
                            )}
                        </h3>
                        <div className={styles.role}>{item.role}</div>
                        <div className={styles.loc}>{item.location}</div>
                    </div>
                    <div>
                        <div className={styles.period}>{item.period}</div>
                        <div className={styles.metricRow}>
                            {item.metric.delta}{" "}
                            <span className={styles.metricLabel}>
                                {item.metric.label}
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.stack}>
                    {item.stack.map((s) => (
                        <span key={s} className="tag">
                            {s}
                        </span>
                    ))}
                </div>
                {open && (
                    <div className={styles.details}>
                        {item.bullets.map((b, i) => (
                            <div key={i} className={styles.bullet}>
                                <span className={styles.bulletDot}>↳</span>
                                <span>{b}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className={styles.footer}>
                    <span
                        className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
                    >
                        ›
                    </span>
                    {open ? "COLLAPSE" : "EXPAND"}
                </div>
            </div>
        </div>
    );
}

export default function Timeline() {
    return (
        <section id="experience">
            <div className="section-head">
                <div>
                    <div className="eyebrow">
                        <span className="idx">03</span> · EXPERIENCE
                    </div>
                    <h2>Eight years of shipping into production.</h2>
                </div>
                <p className="lede">
                    From founding engineer at a 6-person startup to platform
                    owner at a Series C. Click any role to expand.
                </p>
            </div>
            <div className={styles.wrap}>
                <div className={styles.rail} />
                {TIMELINE.map((item, i) => (
                    <TimelineItem
                        key={item.company}
                        item={item}
                        defaultOpen={i === 0}
                    />
                ))}
            </div>
        </section>
    );
}

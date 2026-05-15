import styles from "./style.module.css";

function shortUrl(url) {
    try {
        const u = new URL(url);
        return (u.hostname.replace(/^www\./, "") + u.pathname).replace(
            /\/$/,
            ""
        );
    } catch {
        return url;
    }
}

function renderBullet(text) {
    // "Label: URL" at end → render as a single CTA-style link
    const cta = text.match(/^(.+?):\s+(https?:\/\/\S+)$/);
    if (cta) {
        const [, label, rawUrl] = cta;
        const trail = rawUrl.match(/[.,;:!?)\]]+$/);
        const url = trail ? rawUrl.slice(0, -trail[0].length) : rawUrl;
        return (
            <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={styles.bulletLink}
            >
                {label} ↗
            </a>
        );
    }

    // Otherwise, split the text and inline-linkify any URLs found
    const parts = text.split(/(https?:\/\/\S+)/g);
    return parts.map((part, i) => {
        if (!/^https?:\/\//.test(part)) return part;
        const trail = part.match(/[.,;:!?)\]]+$/);
        const url = trail ? part.slice(0, -trail[0].length) : part;
        const tail = trail ? trail[0] : "";
        return (
            <span key={i}>
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.bulletLink}
                >
                    {shortUrl(url)} ↗
                </a>
                {tail}
            </span>
        );
    });
}

function TimelineItem({ item }) {
    return (
        <div className={styles.item}>
            <div
                className={`${styles.node} ${item.current ? styles.nodeCurrent : ""}`}
            />
            <div className={`${styles.card} ${styles.cardOpen}`}>
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
                <div className={styles.details}>
                    {item.bullets.map((b, i) => (
                        <div key={i} className={styles.bullet}>
                            <span className={styles.bulletDot}>↳</span>
                            <span>{renderBullet(b)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Timeline({ id, eyebrow, title, lede, items }) {
    return (
        <section id={id}>
            <div className="section-head">
                <div>
                    <div className="eyebrow">{eyebrow}</div>
                    <h2>{title}</h2>
                </div>
                <p className="lede">{lede}</p>
            </div>
            <div className={styles.wrap}>
                <div className={styles.rail} />
                {items.map((item) => (
                    <TimelineItem key={item.company} item={item} />
                ))}
            </div>
        </section>
    );
}

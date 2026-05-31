import styles from "./style.module.css";

const MARKDOWN_LINK_RE = /\[([^\]]+)]\(([^)\s]+)\)/g;

function isAllowedLink(href) {
    return /^(https?:\/\/|mailto:)/i.test(href);
}

function renderMarkdownLinks(text) {
    const parts = [];
    let lastIndex = 0;

    for (const match of text.matchAll(MARKDOWN_LINK_RE)) {
        const [raw, label, href] = match;
        const index = match.index ?? 0;

        if (index > lastIndex) {
            parts.push(text.slice(lastIndex, index));
        }

        if (isAllowedLink(href)) {
            parts.push(
                <a
                    key={`${href}-${index}`}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className={styles.bulletLink}
                >
                    {label}
                </a>
            );
        } else {
            parts.push(raw);
        }

        lastIndex = index + raw.length;
    }

    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }

    return parts.length ? parts : text;
}

function renderBullet(text) {
    const cta = text.match(/^\[([^\]]+)]\((https?:\/\/[^)\s]+)\)$/);

    if (cta) {
        const [, label, href] = cta;
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={styles.bulletLink}
            >
                {label} ↗
            </a>
        );
    }

    return renderMarkdownLinks(text);
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
                    <TimelineItem
                        key={`${item.company}-${item.role}-${item.period}`}
                        item={item}
                    />
                ))}
            </div>
        </section>
    );
}

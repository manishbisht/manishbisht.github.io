import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import SectionHead from "../primitives/SectionHead";
import styles from "./style.module.css";

const MARKDOWN_LINK_RE = /\[([^\]]+)]\(([^)\s]+)\)/g;

function isAllowedLink(href) {
    return /^(https?:\/\/|mailto:)/i.test(href);
}

function renderBullet(text) {
    const parts = [];
    let lastIndex = 0;

    for (const match of text.matchAll(MARKDOWN_LINK_RE)) {
        const [raw, label, href] = match;
        const index = match.index ?? 0;

        if (index > lastIndex) parts.push(text.slice(lastIndex, index));

        if (isAllowedLink(href)) {
            const external = !href.startsWith("mailto:");
            parts.push(
                <a
                    key={`${href}-${index}`}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                    className={styles.link}
                >
                    {label}
                </a>
            );
        } else {
            parts.push(raw);
        }

        lastIndex = index + raw.length;
    }

    if (lastIndex < text.length) parts.push(text.slice(lastIndex));

    return parts.length ? parts : text;
}

export default function Timeline({
    id,
    eyebrow,
    title,
    lede,
    items,
    variant = "default",
}) {
    const oss = variant === "oss";

    return (
        <Card
            as="section"
            id={id}
            tone={oss ? "dark" : "surface"}
            radius="section"
            className={`${styles.section} ${oss ? styles.oss : ""} sectionReveal`}
        >
            <SectionHead
                eyebrow={eyebrow}
                title={title}
                lede={lede}
                accent={oss ? "var(--teal)" : undefined}
            />

            <div className={oss ? styles.gridOss : styles.list}>
                {items.map((item) => (
                    <Card
                        key={`${item.company}-${item.role}-${item.period}`}
                        as="article"
                        tone={oss ? "oss" : "raised"}
                        radius="card"
                        className={styles.job}
                    >
                        <div className={styles.top}>
                            <div>
                                <h3 className={styles.company}>
                                    {item.company}
                                    {item.current && (
                                        <span className={styles.now}>NOW</span>
                                    )}
                                </h3>
                                <div className={styles.role}>{item.role}</div>
                                {item.location && !oss && (
                                    <div className={styles.loc}>
                                        {item.location}
                                    </div>
                                )}
                            </div>
                            <div className={styles.right}>
                                <div className={styles.period}>
                                    {item.period}
                                </div>
                                <div className={styles.metric}>
                                    <span className={styles.delta}>
                                        {item.metric.delta}
                                    </span>
                                    <span className={styles.metricLabel}>
                                        {item.metric.label}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.stack}>
                            {item.stack.map((s) => (
                                <Chip key={s}>{s}</Chip>
                            ))}
                        </div>

                        <ul className={styles.bullets}>
                            {item.bullets.map((b, i) => (
                                <li key={i} className={styles.bullet}>
                                    <span
                                        aria-hidden="true"
                                        className={styles.arrow}
                                    >
                                        ↳
                                    </span>
                                    <span>{renderBullet(b)}</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                ))}
            </div>
        </Card>
    );
}

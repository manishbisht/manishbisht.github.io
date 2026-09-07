import styles from "./style.module.css";

export default function SectionHead({
    eyebrow,
    title,
    lede,
    align = "end",
    size = "default",
    accent,
    headingLevel: HeadingTag = "h2",
}) {
    return (
        <div className={`${styles.head} ${styles[align]}`}>
            <div>
                <div
                    className={styles.eyebrow}
                    style={accent ? { color: accent } : undefined}
                >
                    {eyebrow}
                </div>
                <HeadingTag className={`${styles.title} ${styles[size]}`}>
                    {title}
                </HeadingTag>
            </div>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
        </div>
    );
}

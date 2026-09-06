import styles from "./style.module.css";

export default function SectionHead({
    eyebrow,
    title,
    lede,
    align = "end",
    size = "default",
    accent,
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
                <h2 className={`${styles.title} ${styles[size]}`}>{title}</h2>
            </div>
            {lede ? <p className={styles.lede}>{lede}</p> : null}
        </div>
    );
}

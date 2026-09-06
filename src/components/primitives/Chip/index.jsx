import styles from "./style.module.css";

export default function Chip({
    variant = "mono",
    tone = "default",
    as: Tag = "span",
    dot,
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.chip, styles[variant], styles[tone], className]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {dot ? (
                <span
                    data-dot=""
                    aria-hidden="true"
                    className={styles.dot}
                    style={{ background: dot }}
                />
            ) : null}
            {children}
        </Tag>
    );
}

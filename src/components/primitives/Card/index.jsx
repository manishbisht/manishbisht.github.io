import styles from "./style.module.css";

const RADIUS = {
    section: styles.section,
    card: styles.card_,
    tile: styles.tile,
    link: styles.link,
};

export default function Card({
    tone = "surface",
    radius = "card",
    as: Tag = "div",
    className = "",
    children,
    ...rest
}) {
    const classes = [styles.card, styles[tone], RADIUS[radius], className]
        .filter(Boolean)
        .join(" ");

    return (
        <Tag className={classes} {...rest}>
            {children}
        </Tag>
    );
}

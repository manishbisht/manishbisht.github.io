import styles from "./style.module.css";

export default function CornerMark({
    size = 12,
    color = "currentColor",
    opacity = 0.6,
    className = "",
}) {
    return (
        <span
            aria-hidden="true"
            className={`${styles.mark} ${className}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                borderColor: color,
                opacity,
            }}
        />
    );
}

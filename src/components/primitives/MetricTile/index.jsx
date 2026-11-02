import Card from "../Card";
import CornerMark from "../CornerMark";
import styles from "./style.module.css";

// `finalValue` is what the tile settles on once a count-up animation ends.
// Screen readers and crawlers get that instead of the in-between numbers.
export default function MetricTile({ value, finalValue, label, bg, fg }) {
    const settled = finalValue ?? value;
    return (
        <Card
            radius="tile"
            className={styles.tile}
            style={{ background: bg, color: fg }}
        >
            <div
                className={styles.value}
                style={{ fontVariantNumeric: "tabular-nums" }}
            >
                <span aria-hidden={settled !== value || undefined}>
                    {value}
                </span>
                {settled !== value && (
                    <span className={styles.srOnly}>{settled}</span>
                )}
            </div>
            <div className={styles.label}>{label}</div>
            <CornerMark size={10} opacity={0.6} className={styles.mark} />
        </Card>
    );
}

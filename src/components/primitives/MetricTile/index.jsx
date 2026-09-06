import Card from "../Card";
import CornerMark from "../CornerMark";
import styles from "./style.module.css";

export default function MetricTile({ value, label, bg, fg }) {
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
                {value}
            </div>
            <div className={styles.label}>{label}</div>
            <CornerMark size={10} opacity={0.6} className={styles.mark} />
        </Card>
    );
}

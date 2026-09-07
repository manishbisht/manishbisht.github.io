import { TICKER } from "./constants";
import styles from "./style.module.css";

export default function Marquee() {
    const items = [...TICKER, ...TICKER];

    return (
        <div aria-hidden="true" className={styles.wrap}>
            <div className={styles.track}>
                {items.map((item, i) => (
                    <span key={`${item}-${i}`} className={styles.item}>
                        {item}
                        <span className={styles.dot} />
                    </span>
                ))}
            </div>
        </div>
    );
}

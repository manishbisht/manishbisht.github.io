import { NAV } from "./constants";
import styles from "./style.module.css";

export default function HeroRail() {
    return (
        <nav className={styles.rail} aria-label="Sections">
            {NAV.map((item) => (
                <a key={item.id} href={`#${item.id}`} className={styles.link}>
                    {item.label}
                </a>
            ))}
        </nav>
    );
}

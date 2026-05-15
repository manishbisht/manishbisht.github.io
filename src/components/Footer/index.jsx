import { BUILD_VERSION, COMMIT_SHA } from "../../config/env";
import styles from "./style.module.css";

export default function Footer() {
    return (
        <footer className={styles.wrap}>
            <div className={styles.brand}>
                <img
                    src="/logo.webp"
                    alt="Manish Bisht"
                    width="32"
                    height="32"
                    loading="lazy"
                    decoding="async"
                    className={styles.brandImg}
                />
                <div className={styles.brandText}>Manish Bisht</div>
            </div>
            <div className={styles.meta}>
                <span>
                    BUILD <span className={styles.hash}>{COMMIT_SHA}</span>
                </span>
                <span className={styles.metaDot} />
                <span>v{BUILD_VERSION}</span>
            </div>
            <div className={styles.legal}>
                © {new Date().getFullYear()} · Made with ❤️ in India
            </div>
        </footer>
    );
}

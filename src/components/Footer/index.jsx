import { BUILD_VERSION, COMMIT_SHA } from "../../config/env";
import styles from "./style.module.css";

export default function Footer() {
    return (
        <footer className={styles.wrap}>
            <div className={styles.brand}>
                <img
                    src="/logo.webp"
                    alt=""
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                    className={styles.logo}
                />
                Manish Bisht
            </div>

            <div className={styles.meta}>
                BUILD <span className={styles.hash}>{COMMIT_SHA}</span> · v
                {BUILD_VERSION}
            </div>

            <div className={styles.legal}>
                © {new Date().getFullYear()} · Made with ❤️ in India
            </div>
        </footer>
    );
}

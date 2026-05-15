import { Link } from "react-router-dom";
import Impact from "../../components/Impact";
import styles from "./style.module.css";

export default function ImpactPage() {
    return (
        <>
            <section className={styles.hero}>
                <Link to="/" className={styles.back}>
                    ← Back to portfolio
                </Link>
                <div className={styles.eyebrow}>
                    <span className={styles.idx}>02</span> · ENGINEERING IMPACT
                </div>
                <h1 className={styles.title}>
                    Numbers that survived
                    <br />
                    <span className={styles.titleAccent}>a postmortem.</span>
                </h1>
                <p className={styles.lede}>
                    Production metrics from systems I&apos;ve owned. Not
                    throwaway demos — these are the receipts.
                </p>
            </section>

            <section>
                <Impact standalone />
            </section>
        </>
    );
}

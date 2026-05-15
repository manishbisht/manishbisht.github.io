import { Link } from "react-router-dom";
import CaseStudies from "../../components/CaseStudies";
import styles from "./style.module.css";

export default function WorkPage() {
    return (
        <>
            <section className={styles.hero}>
                <Link to="/" className={styles.back}>
                    ← Back to portfolio
                </Link>
                <div className={styles.eyebrow}>
                    SELECTED WORK
                </div>
                <h1 className={styles.title}>
                    Architecture, performance,
                    <br />
                    <span className={styles.titleAccent}>
                        and shipping at scale.
                    </span>
                </h1>
                <p className={styles.lede}>
                    Engagements I&apos;d stake a reputation on. Real
                    constraints, real trade-offs, real numbers.
                </p>
            </section>

            <section>
                <CaseStudies standalone />
            </section>
        </>
    );
}

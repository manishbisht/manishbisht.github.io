import { Link } from "react-router-dom";
import Consulting from "../../components/Consulting";
import styles from "./style.module.css";

export default function ConsultingPage() {
    return (
        <>
            <section className={styles.hero}>
                <Link to="/" className={styles.back}>
                    ← Back to portfolio
                </Link>
                <div className={styles.eyebrow}>
                    <span className={styles.idx}>07</span> · ENGAGEMENTS
                </div>
                <h1 className={styles.title}>
                    Engagements,
                    <br />
                    <span className={styles.titleAccent}>not gigs.</span>
                </h1>
                <p className={styles.lede}>
                    A small number of clients each year. Senior architecture,
                    performance, and developer-productivity work — not body
                    shopping.
                </p>
            </section>

            <section>
                <Consulting standalone />
            </section>
        </>
    );
}

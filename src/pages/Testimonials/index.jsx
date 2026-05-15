import { Link } from "react-router-dom";
import Testimonials from "../../components/Testimonials";
import styles from "./style.module.css";

export default function TestimonialsPage() {
    return (
        <>
            <section className={styles.hero}>
                <Link to="/" className={styles.back}>
                    ← Back to portfolio
                </Link>
                <div className={styles.eyebrow}>
                    <span className={styles.idx}>06</span> · WHAT LEADERS SAY
                </div>
                <h1 className={styles.title}>
                    People who&apos;ve
                    <br />
                    <span className={styles.titleAccent}>shipped with me.</span>
                </h1>
                <p className={styles.lede}>
                    No marketing copy — quotes lifted verbatim from references
                    and reviews.
                </p>
            </section>

            <section>
                <Testimonials standalone />
            </section>
        </>
    );
}

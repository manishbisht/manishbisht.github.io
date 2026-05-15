import { Link } from "react-router-dom";
import { WRITING } from "../../components/Writing/constants";
import styles from "./style.module.css";

export default function WritingPage() {
    return (
        <>
            <section className={styles.hero}>
                <Link to="/" className={styles.back}>
                    <span className={styles.backArrow}>←</span> Back to
                    portfolio
                </Link>
                <div className={styles.eyebrow}>
                    WRITING
                </div>
                <h1 className={styles.title}>
                    Things I&apos;ve thought
                    <br />
                    <span className={styles.titleAccent}>hard about.</span>
                </h1>
                <p className={styles.lede}>
                    Long-form notes on engineering systems, performance, and
                    what it actually means to scale a team.
                </p>
            </section>

            <section className={styles.posts}>
                <div className={styles.list}>
                    {WRITING.map((post) => (
                        <a key={post.title} href="#" className={styles.row}>
                            <div className={styles.date}>{post.date}</div>
                            <div>
                                <h2 className={styles.postTitle}>
                                    {post.title}
                                </h2>
                                <div className={styles.meta}>
                                    {post.eyebrow}
                                </div>
                            </div>
                            <span className={styles.tag}>{post.tag}</span>
                            <span className={styles.arrow}>↗</span>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
}

import PageShell from "../../components/primitives/PageShell";
import { WRITING } from "../../components/Writing/constants";
import styles from "../../components/Writing/style.module.css";

export default function WritingPage() {
    return (
        <PageShell
            eyebrow="WRITING"
            title="Things I've thought hard about."
            lede="Long-form notes on engineering systems, performance, and what it actually means to scale a team."
        >
            <div className={styles.list}>
                {WRITING.map((post) => (
                    <a key={post.title} href="#" className={styles.row}>
                        <div className={styles.date}>{post.date}</div>
                        <div>
                            <h2 className={styles.titleText}>{post.title}</h2>
                            <div className={styles.meta}>{post.eyebrow}</div>
                        </div>
                        <span className={styles.tag}>{post.tag}</span>
                        <span className={styles.arrow}>↗</span>
                    </a>
                ))}
            </div>
        </PageShell>
    );
}

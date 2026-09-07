import { WRITING } from "./constants";
import styles from "./style.module.css";

function WritingList({ headingLevel: Heading = "h3" }) {
    return (
        <div className={styles.list}>
            {WRITING.map((p) => (
                <a key={p.title} href="#" className={styles.row}>
                    <div className={styles.date}>{p.date}</div>
                    <div>
                        <Heading className={styles.titleText}>
                            {p.title}
                        </Heading>
                        <div className={styles.meta}>{p.eyebrow}</div>
                    </div>
                    <span className={styles.tag}>{p.tag}</span>
                    <span className={styles.arrow}>↗</span>
                </a>
            ))}
        </div>
    );
}

export default function Writing({ standalone = false }) {
    if (standalone) return <WritingList headingLevel="h2" />;
    return (
        <section id="writing">
            <div className="section-head">
                <div>
                    <div className="eyebrow">WRITING</div>
                    <h2>Things I&apos;ve thought hard about.</h2>
                </div>
                <p className="lede">
                    Long-form notes on engineering systems, performance, and
                    what it actually means to scale a team.
                </p>
            </div>
            <WritingList />
            <div className={styles.allLink}>
                <a href="#">All writing →</a>
            </div>
        </section>
    );
}

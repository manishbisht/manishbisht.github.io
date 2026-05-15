import { WRITING } from "./constants";
import styles from "./style.module.css";

export default function Writing() {
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
            <div className={styles.list}>
                {WRITING.map((p) => (
                    <a key={p.title} href="#" className={styles.row}>
                        <div className={styles.date}>{p.date}</div>
                        <div>
                            <h3 className={styles.titleText}>{p.title}</h3>
                            <div className={styles.meta}>{p.eyebrow}</div>
                        </div>
                        <span className={styles.tag}>{p.tag}</span>
                        <span className={styles.arrow}>↗</span>
                    </a>
                ))}
            </div>
            <div className={styles.allLink}>
                <a href="#">All writing →</a>
            </div>
        </section>
    );
}

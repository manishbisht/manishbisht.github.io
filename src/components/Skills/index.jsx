import { SKILLS } from "./constants";
import styles from "./style.module.css";

const GLYPHS = ["▮▮▮", "{ }", "◐", "≋", "⧗", "⇄", "◉", "⌖", "△"];

export default function Skills() {
    return (
        <section id="skills">
            <div className="section-head">
                <div>
                    <div className="eyebrow">
                        <span className="idx">04</span> · SKILLS & SYSTEMS
                    </div>
                    <h2>The stack I think in.</h2>
                </div>
                <p className="lede">
                    Categorized by how I actually use them — not by popularity.
                    Depth over breadth.
                </p>
            </div>
            <div className={styles.grid}>
                {SKILLS.map((c, i) => (
                    <div key={c.title} className={styles.cluster}>
                        <div className={styles.head}>
                            <span className={styles.ord}>0{i + 1}</span>
                            <h3 className={styles.title}>{c.title}</h3>
                            <span className={styles.glyph}>{GLYPHS[i]}</span>
                        </div>
                        <div className={styles.items}>
                            {c.items.map((it) => (
                                <div key={it} className={styles.item}>
                                    <span className={styles.bullet} />
                                    <span>{it}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

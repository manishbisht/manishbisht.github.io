import Card from "../primitives/Card";
import CornerMark from "../primitives/CornerMark";
import SectionHead from "../primitives/SectionHead";
import { SKILLS } from "./constants";
import styles from "./style.module.css";

const PALETTE = [
    "teal",
    "raised",
    "purple",
    "raised",
    "yellow",
    "raised",
    "dark",
    "raised",
    "blue",
];

export default function Skills() {
    return (
        <Card
            as="section"
            id="skills"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <SectionHead
                eyebrow="SKILLS"
                title="Applied AI, frontend, and backend — and the infra between."
            />

            <div className={styles.grid}>
                {SKILLS.map((cluster, i) => (
                    <Card
                        key={cluster.title}
                        tone={PALETTE[i % PALETTE.length]}
                        radius="card"
                        className={styles.cluster}
                    >
                        <div className={styles.ord}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <h3 className={styles.title}>{cluster.title}</h3>
                        <ul className={styles.items}>
                            {cluster.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                        <CornerMark size={12} />
                    </Card>
                ))}
            </div>
        </Card>
    );
}

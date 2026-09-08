import Card from "../primitives/Card";
import CornerMark from "../primitives/CornerMark";
import { AI_PROMPT, AI_TOOLS } from "./constants";
import styles from "./style.module.css";

export default function AskAI() {
    return (
        <Card as="section" radius="section" className={styles.section}>
            <CornerMark size={12} opacity={0.5} className={styles.mark} />
            <div className={styles.eyebrow}>ASK AN AI</div>
            <h2 className={styles.title}>
                Rather ask a machine than read a portfolio?
            </h2>
            <p className={styles.lede}>
                Opens your assistant with a question about my work already
                filled in.
            </p>

            <ul className={styles.tools}>
                {AI_TOOLS.map((tool) => (
                    <li key={tool.id}>
                        <a
                            className={styles.tool}
                            href={tool.href(AI_PROMPT)}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {tool.label}
                            <span aria-hidden="true"> ↗</span>
                        </a>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

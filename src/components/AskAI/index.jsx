import { useState } from "react";
import Card from "../primitives/Card";
import CornerMark from "../primitives/CornerMark";
import { AI_PROMPT, AI_TOOLS } from "./constants";
import styles from "./style.module.css";

export default function AskAI() {
    const [copied, setCopied] = useState(false);

    // Claude has no working web prefill, so put the prompt on the clipboard
    // and let the visitor paste it. The link still opens either way — a failed
    // clipboard write must not swallow the navigation.
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(AI_PROMPT);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    };

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
                            onClick={tool.copy ? handleCopy : undefined}
                        >
                            {tool.label}
                            <span aria-hidden="true"> ↗</span>
                        </a>
                    </li>
                ))}
            </ul>

            <p className={styles.note}>
                {copied
                    ? "Prompt copied — paste it into Claude."
                    : "Claude has no prefill, so its prompt is copied to your clipboard instead."}
            </p>
        </Card>
    );
}

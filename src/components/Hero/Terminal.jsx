import { useEffect, useState } from "react";
import Card from "../primitives/Card";
import styles from "./terminal.module.css";

const STEPS = 6;

function prefersReducedMotion() {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Line({ show, className, children }) {
    // visibility (not conditional rendering) so every line occupies its final
    // space from first paint — the reveal must not reflow the page.
    return (
        <div
            className={className}
            style={{ visibility: show ? "visible" : "hidden" }}
        >
            {children}
        </div>
    );
}

function Key({ children }) {
    return <span className={styles.key}>&quot;{children}&quot;</span>;
}

function Str({ children }) {
    return <span className={styles.str}>&quot;{children}&quot;</span>;
}

export default function Terminal() {
    const instant = prefersReducedMotion();
    const [step, setStep] = useState(instant ? STEPS : 0);

    useEffect(() => {
        if (instant || step >= STEPS) return undefined;
        const id = setTimeout(
            () => setStep((s) => s + 1),
            step === 0 ? 600 : 800
        );
        return () => clearTimeout(id);
    }, [step, instant]);

    return (
        <Card tone="dark" radius="card" className={styles.term}>
            <div className={styles.bar}>
                <span className={`${styles.light} ${styles.red}`} />
                <span className={`${styles.light} ${styles.amber}`} />
                <span className={`${styles.light} ${styles.green}`} />
                <span className={styles.title}>~/manish — zsh</span>
            </div>

            <Line show={step >= 1}>
                <span className={styles.prompt}>$</span> whoami
            </Line>
            <Line show={step >= 2}>manishbisht</Line>
            <Line show={step >= 3} className={styles.spaced}>
                <span className={styles.prompt}>$</span> cat ~/profile.json
            </Line>
            <Line show={step >= 4}>
                {"{"}
                <br />
                &nbsp;&nbsp;<Key>role</Key>: <Str>Staff Engineer</Str>,
                <br />
                &nbsp;&nbsp;<Key>at</Key>: <Str>VideoVerse</Str>,
                <br />
                &nbsp;&nbsp;<Key>stack</Key>: [<Str>React</Str>, <Str>TS</Str>,{" "}
                <Str>AWS</Str>],
                <br />
                &nbsp;&nbsp;<Key>open_to</Key>: [<Str>Applied AI</Str>,{" "}
                <Str>Frontend</Str>, <Str>Backend</Str>],
                <br />
                &nbsp;&nbsp;<Key>consulting</Key>: {"{ "}
                <Key>available</Key>: <Str>Q3 2026</Str>, <Key>clients</Key>:{" "}
                <span className={styles.num}>2</span>, <Key>reply</Key>:{" "}
                <Str>&lt;24h</Str> {"}"},
                <br />
                &nbsp;&nbsp;<Key>shipped_pct</Key>:{" "}
                <span className={styles.num}>0.98</span>
                <br />
                {"}"}
            </Line>
            <Line show={step >= 5} className={styles.spaced}>
                <span className={styles.prompt}>$</span> ship
                --target=production
            </Line>
            <Line show={step >= 6} className={styles.ok}>
                ✓ deployed in 2.9s · 0 rollbacks
            </Line>
            <span aria-hidden="true" className={styles.caret} />
        </Card>
    );
}

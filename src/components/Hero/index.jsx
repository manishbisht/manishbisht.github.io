import { useState, useEffect } from "react";
import styles from "./style.module.css";

const LINES = [
    { type: "cmd", text: "whoami" },
    { type: "out", text: "manishbisht" },
    { type: "cmd", text: "cat ~/profile.json" },
    { type: "json" },
    { type: "cmd", text: "ship --target=production" },
    { type: "ok", text: "✓ deployed in 2.9s · 0 rollbacks" },
];

export default function Hero() {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step >= LINES.length) return;
        const t = setTimeout(
            () => setStep((s) => s + 1),
            step === 0 ? 600 : 800
        );
        return () => clearTimeout(t);
    }, [step]);

    return (
        <section id="top" className={styles.section}>
            <div className={styles.left}>
                <div className={styles.statusPill}>
                    <span className={styles.statusDot} />
                    Available for selective freelance & consulting · responds in
                    &lt; 24h
                </div>
                <h1 className={styles.title}>
                    Engineering systems
                    <br />
                    that{" "}
                    <span className={styles.titleAccent}>scale quietly.</span>
                </h1>
                <p className={styles.lede}>
                    I build performant, scalable, developer-friendly product
                    systems — and the engineering culture that ships them.
                </p>
                <div className={styles.roleRow}>
                    <span>STAFF ENGINEER</span>
                    <span className={styles.dotSep} />
                    <span>VIDEOVERSE</span>
                    <span className={styles.dotSep} />
                    <span>INDIA · IST</span>
                </div>
                <div className={styles.ctas}>
                    <a
                        href="mailto:hi@manishbisht.me?subject=Let%27s%20build%20something%20together"
                        className={styles.btnPrimary}
                    >
                        Get in touch <span className={styles.btnArrow}>↗</span>
                    </a>
                    <a
                        href="https://bit.ly/202001ManishBishtResume"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnSec}
                    >
                        View résumé{" "}
                        <span className={styles.btnArrowMuted}>→</span>
                    </a>
                    <a
                        href="https://github.com/manishbisht"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnGhost}
                    >
                        GitHub ↗
                    </a>
                    <a
                        href="https://www.linkedin.com/in/manishbisht02"
                        target="_blank"
                        rel="noreferrer"
                        className={styles.btnGhost}
                    >
                        LinkedIn ↗
                    </a>
                </div>
            </div>

            <div className={styles.terminal}>
                <div className={styles.termBar}>
                    <div className={styles.termLights}>
                        <span
                            className={`${styles.termLight} ${styles.termLightRed}`}
                        />
                        <span
                            className={`${styles.termLight} ${styles.termLightYellow}`}
                        />
                        <span
                            className={`${styles.termLight} ${styles.termLightGreen}`}
                        />
                    </div>
                    <span className={styles.termTitle}>~/manish — zsh</span>
                </div>
                <div className={styles.termBody}>
                    {step >= 1 && (
                        <div>
                            <span className={styles.prompt}>$</span> whoami
                        </div>
                    )}
                    {step >= 2 && <div>manishbisht</div>}
                    {step >= 3 && (
                        <div className={styles.spaced}>
                            <span className={styles.prompt}>$</span> cat
                            ~/profile.json
                        </div>
                    )}
                    {step >= 4 && (
                        <div>
                            {"{"}
                            <br />
                            &nbsp;&nbsp;
                            <span className={styles.jsonKey}>
                                &quot;role&quot;
                            </span>
                            :{" "}
                            <span className={styles.jsonStr}>
                                &quot;Staff Engineer&quot;
                            </span>
                            ,<br />
                            &nbsp;&nbsp;
                            <span className={styles.jsonKey}>
                                &quot;at&quot;
                            </span>
                            :{" "}
                            <span className={styles.jsonStr}>
                                &quot;VideoVerse&quot;
                            </span>
                            ,<br />
                            &nbsp;&nbsp;
                            <span className={styles.jsonKey}>
                                &quot;stack&quot;
                            </span>
                            : [
                            <span className={styles.jsonStr}>
                                &quot;React&quot;
                            </span>
                            ,{" "}
                            <span className={styles.jsonStr}>
                                &quot;TS&quot;
                            </span>
                            ,{" "}
                            <span className={styles.jsonStr}>
                                &quot;AWS&quot;
                            </span>
                            ],
                            <br />
                            &nbsp;&nbsp;
                            <span className={styles.jsonKey}>
                                &quot;shipped_pct&quot;
                            </span>
                            : <span className={styles.jsonNum}>0.98</span>
                            <br />
                            {"}"}
                        </div>
                    )}
                    {step >= 5 && (
                        <div className={styles.spaced}>
                            <span className={styles.prompt}>$</span> ship
                            --target=production
                            <span className={styles.caret} />
                        </div>
                    )}
                    {step >= 6 && (
                        <div className={styles.termOk}>
                            ✓ deployed in 2.9s · 0 rollbacks
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

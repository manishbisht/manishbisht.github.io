import { IMPACT } from "./constants";
import styles from "./style.module.css";

function Sparkline({ points, color = "success", invert = false }) {
    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;
    const w = 180,
        h = 70;
    const step = w / (points.length - 1);
    const path = points
        .map((p, i) => {
            const x = i * step;
            const y = invert
                ? h - 6 - ((p - min) / range) * (h - 12)
                : 6 + ((p - min) / range) * (h - 12);
            return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
        })
        .join(" ");
    const stroke =
        color === "info" ? "oklch(78% 0.13 230)" : "oklch(78% 0.16 155)";
    const fill =
        color === "info"
            ? "oklch(78% 0.13 230 / 0.10)"
            : "oklch(78% 0.16 155 / 0.10)";
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return (
        <svg
            className={styles.spark}
            viewBox={`0 0 ${w} ${h}`}
            preserveAspectRatio="none"
        >
            <path d={area} fill={fill} />
            <path
                d={path}
                fill="none"
                stroke={stroke}
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    );
}

function ImpactGrid() {
    return (
        <div className={styles.grid}>
            {IMPACT.map((t, i) => (
                <div key={i} className={styles.tile}>
                    <div>
                        <div className={styles.label}>{t.label}</div>
                        <div className={styles.value}>
                            {t.value}
                            <span className={styles.unit}>{t.unit}</span>
                        </div>
                        <span
                            className={`${styles.delta} ${t.color === "info" ? styles.deltaInfo : styles.deltaSuccess}`}
                        >
                            {t.delta.startsWith("−") || t.delta.startsWith("-")
                                ? "↓"
                                : "↑"}{" "}
                            {t.delta.replace(/^[−\-+]/, "")}
                        </span>
                    </div>
                    <div className={styles.sub}>{t.sub}</div>
                    <Sparkline
                        points={t.trend}
                        color={t.color}
                        invert={i % 2 === 1}
                    />
                </div>
            ))}
        </div>
    );
}

export default function Impact({ standalone = false }) {
    if (standalone) return <ImpactGrid />;
    return (
        <section id="impact">
            <div className="section-head">
                <div>
                    <div className="eyebrow">
                        <span className="idx">02</span> · ENGINEERING IMPACT
                    </div>
                    <h2>Numbers that survived a postmortem.</h2>
                </div>
                <p className="lede">
                    Production metrics from systems I&apos;ve owned. Not
                    throwaway demos — these are the receipts.
                </p>
            </div>
            <ImpactGrid />
        </section>
    );
}

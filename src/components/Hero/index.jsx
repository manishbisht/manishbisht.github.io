import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import CornerMark from "../primitives/CornerMark";
import MetricTile from "../primitives/MetricTile";
import HeroRail from "../HeroRail";
import ProfileCard from "./ProfileCard";
import Terminal from "./Terminal";
import { useCountUp } from "../../hooks/useCountUp";
import styles from "./style.module.css";

const ROLES = [
    { label: "Applied AI", href: "#skills" },
    { label: "Frontend", href: "#skills" },
    { label: "Backend & platform", href: "#skills" },
    { label: "Consulting", href: "#consulting" },
];

export default function Hero() {
    const p = useCountUp();
    const n = (x) => Math.round(x * p);

    const metrics = [
        {
            value: `${n(10)}+ yrs`,
            label: "shipping to production",
            bg: "var(--teal)",
            fg: "var(--tealInk)",
        },
        {
            value: `${n(100)}+`,
            label: "enterprise customers served",
            bg: "var(--purple)",
            fg: "#fff",
        },
        {
            value: `~${n(7)}M`,
            label: "events / month, event-driven",
            bg: "var(--yellow)",
            fg: "var(--yellowInk)",
        },
        {
            value: `−${n(60)}%`,
            label: "observability cost in 4 weeks",
            bg: "var(--card2)",
            fg: "var(--ink)",
        },
    ];

    return (
        <Card as="section" id="top" radius="section" className={styles.hero}>
            <HeroRail />

            <div className={styles.body}>
                <ProfileCard />

                <div className={styles.right}>
                    <h1 className={styles.title}>
                        Engineering that starts with{" "}
                        <span className={styles.accent}>the customer.</span>
                        <CornerMark
                            size={18}
                            color="var(--ink)"
                            opacity={1}
                            className={styles.titleMark}
                        />
                    </h1>

                    <p className={styles.lede}>
                        I work backwards from the customer problem, ship the
                        smallest thing that solves it, and build the engineering
                        rigour to make it last. A decade across frontend,
                        backend, and platform — now applying it to AI-assisted
                        products and workflows.
                    </p>

                    <div className={styles.row}>
                        <Terminal />
                        <div className={styles.metrics}>
                            {metrics.map((m) => (
                                <MetricTile key={m.label} {...m} />
                            ))}
                        </div>
                    </div>

                    <div className={styles.row}>
                        <Card
                            tone="dark"
                            radius="card"
                            className={styles.roles}
                        >
                            <div className={styles.rolesLabel}>
                                OPEN TO ROLES IN
                            </div>
                            <div className={styles.rolesList}>
                                {ROLES.map((role) => (
                                    <Chip
                                        key={role.label}
                                        as="a"
                                        variant="pill"
                                        tone="outline"
                                        href={role.href}
                                    >
                                        {role.label}
                                    </Chip>
                                ))}
                            </div>
                            <a
                                href="mailto:hi@manishbisht.me?subject=Consulting%20engagement"
                                className={styles.talk}
                            >
                                Let&apos;s talk ↗
                            </a>
                            <CornerMark size={12} color="#fff" opacity={1} />
                        </Card>

                        <Card
                            as="a"
                            href="#consulting"
                            tone="yellow"
                            radius="card"
                            className={styles.banner}
                        >
                            <span aria-hidden="true" className={styles.pulse} />
                            <span className={styles.bannerText}>
                                <span className={styles.bannerTitle}>
                                    Open to Applied AI, Frontend, and Backend
                                    roles
                                </span>
                                <span className={styles.bannerSub}>
                                    Full-time or selective consulting · Q3 2026
                                    · reply in &lt; 24h · See engagements ↓
                                </span>
                            </span>
                            <CornerMark size={12} color="#111114" opacity={1} />
                        </Card>
                    </div>
                </div>
            </div>
        </Card>
    );
}

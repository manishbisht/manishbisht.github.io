import Card from "../primitives/Card";
import Chip from "../primitives/Chip";
import CornerMark from "../primitives/CornerMark";
import SectionHead from "../primitives/SectionHead";
import { SERVICES } from "./constants";
import styles from "./style.module.css";

const TONES = ["dark", "teal", "purple", "yellow"];

const STATUS = [
    { label: "Available Q3 2026", dot: "var(--green)" },
    { label: "1–2 clients at a time", dot: "var(--muted)" },
    { label: "Remote · IST friendly", dot: "var(--muted)" },
];

export default function Consulting() {
    return (
        <Card
            as="section"
            id="consulting"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <div className={styles.head}>
                <div className={styles.headLeft}>
                    <SectionHead
                        eyebrow="ENGAGEMENTS"
                        title={
                            <>
                                Engagements,
                                <br />
                                not gigs.
                            </>
                        }
                        align="start"
                        size="display"
                    />
                    <div className={styles.status}>
                        {STATUS.map((s) => (
                            <Chip key={s.label} variant="pill" dot={s.dot}>
                                {s.label}
                            </Chip>
                        ))}
                    </div>
                </div>
                <div className={styles.copy}>
                    <p>
                        I take a small number of consulting engagements each
                        year — typically with seed–Series B startups that need
                        senior frontend architecture, backend and platform work,
                        applied-AI integration, or developer-productivity help.
                        Also open to the right full-time role.
                    </p>
                    <p>
                        Not a freelance marketplace. Not a code-monkey. I write
                        the RFC, work alongside your team, and leave you with
                        something that survives my departure.
                    </p>
                </div>
            </div>

            <div className={styles.grid}>
                {SERVICES.map((service, i) => (
                    <Card
                        key={service.title}
                        tone={TONES[i % TONES.length]}
                        radius="card"
                        className={styles.service}
                    >
                        <div className={styles.ord}>
                            {String(i + 1).padStart(2, "0")}
                        </div>
                        <div className={styles.serviceTitle}>
                            {service.title}
                        </div>
                        <p className={styles.serviceDesc}>{service.desc}</p>
                        <div className={styles.duration}>
                            TYPICAL DURATION<span>{service.duration}</span>
                        </div>
                        <CornerMark size={12} />
                    </Card>
                ))}
            </div>

            <Card tone="raised" radius="card" className={styles.cta}>
                <p>
                    Start with a short note describing the problem and a rough
                    timeline. I&apos;ll reply in &lt;24h with whether I&apos;m
                    the right fit — or who is, if I&apos;m not.
                </p>
                <a
                    href="mailto:hi@manishbisht.me?subject=Consulting%20engagement"
                    className={styles.ctaBtn}
                >
                    Start a conversation ↗
                </a>
            </Card>
        </Card>
    );
}

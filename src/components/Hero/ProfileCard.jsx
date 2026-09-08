import Card from "../primitives/Card";
import styles from "./profileCard.module.css";

const MAIL = "mailto:hi@manishbisht.me?subject=Let%27s%20Work%20Together";

const LINKS = [
    { label: "Resume →", href: "https://resume.manishbisht.me", solid: true },
    { label: "GitHub ↗", href: "https://github.com/manishbisht" },
    { label: "LinkedIn ↗", href: "https://www.linkedin.com/in/manishbisht02" },
];

export default function ProfileCard() {
    return (
        <Card tone="blue" radius="section" className={styles.card}>
            <div className={styles.about}>
                <span aria-hidden="true" className={styles.aboutDot} />
                About Me
            </div>

            <div className={styles.avatarWrap}>
                <div className={styles.avatarRing}>
                    <img
                        src="/logo.webp"
                        alt="Manish Bisht"
                        width="260"
                        height="260"
                        className={styles.avatar}
                    />
                </div>
            </div>

            <div className={styles.foot}>
                <div>
                    <div className={styles.im}>I&apos;m,</div>
                    <div className={styles.name}>
                        Manish
                        <br />
                        Bisht
                    </div>
                </div>

                <div className={styles.role}>
                    <span>STAFF ENGINEER</span>
                    <span aria-hidden="true">·</span>
                    <span>VIDEOVERSE</span>
                    <span aria-hidden="true">·</span>
                    <span>INDIA · IST</span>
                </div>

                <a href={MAIL} className={styles.email}>
                    hi@manishbisht.me
                    <svg
                        aria-hidden="true"
                        className={styles.emailIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m2 7 10 6 10-6" />
                    </svg>
                </a>

                <div className={styles.ctas}>
                    {LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                            className={
                                link.solid ? styles.ctaSolid : styles.ctaGhost
                            }
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className={styles.badge}>
                10 YRS
                <br />
                SHIPPING
            </div>
        </Card>
    );
}

import styles from "./style.module.css";

const LINKS = [
    {
        label: "Email",
        handle: "hi@manishbisht.me",
        href: "mailto:hi@manishbisht.me",
        arrow: "→",
    },
    {
        label: "Email",
        handle: "manish.bisht490@gmail.com",
        href: "mailto:manish.bisht490@gmail.com",
        arrow: "→",
    },
    {
        label: "GitHub",
        handle: "github.com/manishbisht",
        href: "https://github.com/manishbisht",
        arrow: "↗",
    },
    {
        label: "LinkedIn",
        handle: "linkedin.com/in/manishbisht02",
        href: "https://www.linkedin.com/in/manishbisht02",
        arrow: "↗",
    },
    {
        label: "X / Twitter",
        handle: "@ManishBisht02",
        href: "https://twitter.com/ManishBisht02",
        arrow: "↗",
    },
    {
        label: "Instagram",
        handle: "instagram.com/manishbisht02",
        href: "https://www.instagram.com/manishbisht02",
        arrow: "↗",
    },
    {
        label: "Facebook",
        handle: "fb.com/imanishbisht",
        href: "https://fb.com/imanishbisht",
        arrow: "↗",
    },
    {
        label: "Pinterest",
        handle: "pinterest.com/imanishbisht",
        href: "https://www.pinterest.com/imanishbisht",
        arrow: "↗",
    },
    {
        label: "Medium",
        handle: "medium.com/@manishbisht",
        href: "https://medium.com/@manishbisht",
        arrow: "↗",
    },
];

export default function Contact() {
    return (
        <section id="contact" style={{ paddingBottom: 80 }}>
            <div className="section-head" style={{ marginBottom: 56 }}>
                <div>
                    <div className="eyebrow">
                        <span className="idx">08</span> · GET IN TOUCH
                    </div>
                </div>
            </div>
            <h2 className={styles.big}>
                Building something hard?
                <br />
                <span className={styles.accent}>Let&apos;s talk.</span>
            </h2>
            <div className={styles.links}>
                {LINKS.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        target={
                            l.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                        className={styles.row}
                    >
                        <div>
                            <div className={styles.label}>{l.label}</div>
                            <div className={styles.handle}>{l.handle}</div>
                        </div>
                        <span className={styles.arrow}>{l.arrow}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}

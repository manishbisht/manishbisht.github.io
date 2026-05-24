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
        label: "WhatsApp",
        handle: "+91 8559874393",
        href: "https://api.whatsapp.com/send?phone=918559874393&text=Hi%20Manish%2C%20let%27s%20work%20together",
        arrow: "→",
    },
    {
        label: "GitHub",
        handle: "@manishbisht",
        href: "https://github.com/manishbisht",
        arrow: "↗",
    },
    {
        label: "LinkedIn",
        handle: "@manishbisht02",
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
        handle: "@manishbisht02",
        href: "https://www.instagram.com/manishbisht02",
        arrow: "↗",
    },
    {
        label: "Facebook",
        handle: "@imanishbisht",
        href: "https://fb.com/imanishbisht",
        arrow: "↗",
    },
    {
        label: "Pinterest",
        handle: "@imanishbisht",
        href: "https://www.pinterest.com/imanishbisht",
        arrow: "↗",
    },
    {
        label: "Medium",
        handle: "@manishbisht",
        href: "https://medium.com/@manishbisht",
        arrow: "↗",
    },
    {
        label: "Quora",
        handle: "@Manish-Bisht-39",
        href: "https://www.quora.com/profile/Manish-Bisht-39",
        arrow: "↗",
    },
];

export default function Contact() {
    return (
        <section id="contact" style={{ paddingBottom: 80 }}>
            <div className="section-head" style={{ marginBottom: 56 }}>
                <div>
                    <div className="eyebrow">GET IN TOUCH</div>
                </div>
            </div>
            <h2 className={styles.big}>
                Let&apos;s Work
                <br />
                <span className={styles.accent}>Together ?</span>
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

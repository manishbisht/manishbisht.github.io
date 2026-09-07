import Card from "../primitives/Card";
import { LINKS } from "./constants";
import styles from "./style.module.css";

export default function Contact() {
    return (
        <Card
            as="section"
            id="contact"
            tone="blue"
            radius="section"
            className={`${styles.section} sectionReveal`}
        >
            <div className={styles.eyebrow}>GET IN TOUCH</div>

            <h2 className={styles.big}>
                Let&apos;s Work
                <br />
                <span className={styles.accent}>Together ?</span>
            </h2>

            <div className={styles.grid}>
                {LINKS.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                        <a
                            key={`${link.label}-${link.href}`}
                            href={link.href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noreferrer" : undefined}
                            className={styles.tile}
                        >
                            <span className={styles.text}>
                                <span className={styles.label}>
                                    {link.label}
                                </span>
                                <span className={styles.handle}>
                                    {link.handle}
                                </span>
                            </span>
                            <span aria-hidden="true" className={styles.arrow}>
                                {link.arrow}
                            </span>
                        </a>
                    );
                })}
            </div>
        </Card>
    );
}

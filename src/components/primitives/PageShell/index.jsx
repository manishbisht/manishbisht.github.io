import { Link } from "react-router-dom";
import Card from "../Card";
import SectionHead from "../SectionHead";
import styles from "./style.module.css";

export default function PageShell({ eyebrow, title, lede, children }) {
    return (
        <Card as="section" radius="section" className={styles.shell}>
            <Link to="/" className={styles.back}>
                <span aria-hidden="true">←</span> Back to portfolio
            </Link>
            <SectionHead
                eyebrow={eyebrow}
                title={title}
                lede={lede}
                headingLevel="h1"
            />
            <div className={styles.body}>{children}</div>
        </Card>
    );
}

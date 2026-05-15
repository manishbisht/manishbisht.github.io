import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV } from "./constants";
import styles from "./style.module.css";

export default function Nav() {
    const [active, setActive] = useState("experience");
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const pendingScroll = useRef(null);
    const isHome = location.pathname === "/";

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Update active nav item based on which section is in view
    useEffect(() => {
        if (!isHome) return;
        const ids = NAV.map((n) => n.id);
        const observers = [];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActive(id);
                },
                { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((obs) => obs.disconnect());
    }, [isHome]);

    // Once we've navigated home, fire the deferred scroll
    useEffect(() => {
        if (isHome && pendingScroll.current) {
            const id = pendingScroll.current;
            pendingScroll.current = null;
            setTimeout(() => {
                document
                    .getElementById(id)
                    ?.scrollIntoView({ behavior: "smooth" });
                setActive(id);
            }, 50);
        }
    }, [isHome]);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setActive(id);
    };

    const handleNavClick = (e, id) => {
        e.preventDefault();
        if (isHome) {
            scrollTo(id);
        } else {
            pendingScroll.current = id;
            navigate("/");
        }
    };

    return (
        <div className={styles.wrap}>
            <div
                className={`${styles.pill} ${scrolled ? styles.scrolled : ""}`}
            >
                <Link to="/" className={styles.brand}>
                    <img
                        src="/logo.png"
                        alt="Manish Bisht"
                        className={styles.brandImg}
                    />
                    Manish Bisht
                </Link>
                <nav className={styles.links}>
                    {NAV.map((n) => (
                        <a
                            key={n.id}
                            href={`#${n.id}`}
                            className={`${styles.link} ${isHome && active === n.id ? styles.active : ""}`}
                            onClick={(e) => handleNavClick(e, n.id)}
                        >
                            {n.label}
                        </a>
                    ))}
                </nav>
                <div className={styles.status}>
                    <span className={styles.dot} />
                    available
                </div>
                <a
                    href="mailto:hi@manishbisht.me?subject=Let%27s%20build%20something%20together"
                    className={styles.cta}
                >
                    Get in touch <span className={styles.ctaArrow}>↗</span>
                </a>
            </div>
        </div>
    );
}

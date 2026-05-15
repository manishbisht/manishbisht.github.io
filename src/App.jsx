import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import WritingPage from "./pages/Writing";
import ImpactPage from "./pages/Impact";
import WorkPage from "./pages/Work";
import TestimonialsPage from "./pages/Testimonials";
import ConsultingPage from "./pages/Consulting";
import styles from "./App.module.css";

export default function App() {
    return (
        <>
            <div className={styles.pageBg} aria-hidden="true">
                <div className={styles.grid} />
                <div className={styles.haloA} />
                <div className={styles.haloB} />
            </div>
            <Nav />
            <main className={styles.main}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/writing" element={<WritingPage />} />
                    <Route path="/impact" element={<ImpactPage />} />
                    <Route path="/work" element={<WorkPage />} />
                    <Route
                        path="/testimonials"
                        element={<TestimonialsPage />}
                    />
                    <Route path="/consulting" element={<ConsultingPage />} />
                </Routes>
                <Contact />
                <Footer />
            </main>
        </>
    );
}

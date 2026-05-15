import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import styles from "./App.module.css";

const WritingPage = lazy(() => import("./pages/Writing"));
const ImpactPage = lazy(() => import("./pages/Impact"));
const WorkPage = lazy(() => import("./pages/Work"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));
const ConsultingPage = lazy(() => import("./pages/Consulting"));

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
                <Suspense fallback={null}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/writing" element={<WritingPage />} />
                        <Route path="/impact" element={<ImpactPage />} />
                        <Route path="/work" element={<WorkPage />} />
                        <Route
                            path="/testimonials"
                            element={<TestimonialsPage />}
                        />
                        <Route
                            path="/consulting"
                            element={<ConsultingPage />}
                        />
                    </Routes>
                </Suspense>
                <Contact />
                <Footer />
            </main>
        </>
    );
}

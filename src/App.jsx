import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import styles from "./App.module.css";

const WritingPage = lazy(() => import("./pages/Writing"));
const ImpactPage = lazy(() => import("./pages/Impact"));
const WorkPage = lazy(() => import("./pages/Work"));
const TestimonialsPage = lazy(() => import("./pages/Testimonials"));

export default function App() {
    return (
        <>
            <ThemeToggle />
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
                    </Routes>
                </Suspense>
                <Contact />
                <Footer />
            </main>
        </>
    );
}

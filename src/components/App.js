import React, { Suspense } from "react";
import { HashRouter, Route } from "react-router-dom";
import Header from "./common/Header.js";
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";
const Home = React.lazy(() => import("./pages/Home"));
const Skills = React.lazy(() => import("./pages/Skills"));
const WorkExperience = React.lazy(() => import("./pages/WorkExperience"));
const CompetitiveProgramming = React.lazy(() =>
    import("./pages/CompetitiveProgramming")
);
const OpenSource = React.lazy(() => import("./pages/OpenSource"));
const Education = React.lazy(() => import("./pages/Education"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Contact = React.lazy(() => import("./pages/Contact"));

const Loader = () => (
    <div className="view">
        <div className="mdl-spinner mdl-js-spinner is-active"></div>
    </div>
);

const App = () => (
    <HashRouter>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <Header />
            <Sidebar />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <Home />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/skills"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <Skills />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/work-experience"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <WorkExperience />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/competitive-programming"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <CompetitiveProgramming />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/open-source"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <OpenSource />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/education"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <Education />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/projects"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <Projects />
                            </Suspense>
                        )}
                    />
                    <Route
                        exact
                        path="/contact"
                        render={() => (
                            <Suspense fallback={<Loader />}>
                                <Contact />
                            </Suspense>
                        )}
                    />
                    <Footer />
                </div>
            </main>
        </div>
    </HashRouter>
);

export default App;

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Header from "./common/Header.js";
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";
import Home from "./pages/Home";
import Skills from "./pages/Skills";
import WorkExperience from "./pages/WorkExperience";
import CompetitiveProgramming from "./pages/CompetitiveProgramming";
import OpenSource from "./pages/OpenSource";
import Education from "./pages/Education";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const App = () => (
    <HashRouter>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
            <Header />
            <Sidebar />
            <main className="mdl-layout__content">
                <div className="page-content">
                    <Route exact path="/" render={() => <Home />} />
                    <Route exact path="/skills" render={() => <Skills />} />
                    <Route
                        exact
                        path="/work-experience"
                        render={() => <WorkExperience />}
                    />
                    <Route
                        exact
                        path="/competitive-programming"
                        render={() => <CompetitiveProgramming />}
                    />
                    <Route
                        exact
                        path="/open-source"
                        render={() => <OpenSource />}
                    />
                    <Route
                        exact
                        path="/education"
                        render={() => <Education />}
                    />
                    <Route exact path="/projects" render={() => <Projects />} />
                    <Route exact path="/contact" render={() => <Contact />} />
                    <Footer />
                </div>
            </main>
        </div>
    </HashRouter>
);

export default App;

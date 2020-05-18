import React, { Suspense } from "react";
import { HashRouter, Route } from "react-router-dom";
import { GlobalStyle, AppContainer } from "./components/commonStyle";
import { Header, Footer } from "./components";
import Home from "./pages/Home/Container";
const Experience = React.lazy(() => import("./pages/Experience/Container"));
const Education = React.lazy(() => import("./pages/Education/Container"));

const Loader = () => null;

const App = () => (
    <AppContainer>
        <GlobalStyle />
        <HashRouter>
            <Header />
            <Route
                exact
                path="/"
                render={() => (
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                )}
            />
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/skills"*/}
            {/*    render={() => (*/}
            {/*        <Suspense fallback={<Loader />}>*/}
            {/*            <Skills />*/}
            {/*        </Suspense>*/}
            {/*    )}*/}
            {/*/>*/}
            <Route
                exact
                path="/work-experience"
                render={() => (
                    <Suspense fallback={<Loader />}>
                        <Experience />
                    </Suspense>
                )}
            />
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/competitive-programming"*/}
            {/*    render={() => (*/}
            {/*        <Suspense fallback={<Loader />}>*/}
            {/*            <CompetitiveProgramming />*/}
            {/*        </Suspense>*/}
            {/*    )}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/open-source"*/}
            {/*    render={() => (*/}
            {/*        <Suspense fallback={<Loader />}>*/}
            {/*            <OpenSource />*/}
            {/*        </Suspense>*/}
            {/*    )}*/}
            {/*/>*/}
            <Route
                exact
                path="/education"
                render={() => (
                    <Suspense fallback={<Loader />}>
                        <Education />
                    </Suspense>
                )}
            />
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/projects"*/}
            {/*    render={() => (*/}
            {/*        <Suspense fallback={<Loader />}>*/}
            {/*            <Projects />*/}
            {/*        </Suspense>*/}
            {/*    )}*/}
            {/*/>*/}
            {/*<Route*/}
            {/*    exact*/}
            {/*    path="/contact"*/}
            {/*    render={() => (*/}
            {/*        <Suspense fallback={<Loader />}>*/}
            {/*            <Contact />*/}
            {/*        </Suspense>*/}
            {/*    )}*/}
            {/*/>*/}
            <Footer />
        </HashRouter>
    </AppContainer>
);

export default App;

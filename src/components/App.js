import React, { Component } from 'react';
import { BrowserRouter, Route} from 'react-router-dom'
import Header from './common/Header.js'
import Sidebar from "./common/Sidebar";
import Footer from "./common/Footer";
import Home from './pages/Home';
import OpenSource from './pages/OpenSource';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <Header/>
                <Sidebar/>
                <main className="mdl-layout__content">
                    <div className="page-content">
                        <Route exact path="/" render={() => <Home />} />
                        <Route exact path="/open-source" render={() => <OpenSource />} />
                        <Route exact path="/education" render={() => <Education />} />
                        <Route exact path="/projects" render={() => <Projects />} />
                        <Route exact path="/contact" render={() => <Contact />} />
                        <Footer/>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

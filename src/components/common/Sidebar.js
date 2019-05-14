import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Sidebar extends Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <nav className="mdl-navigation">
                    <Link className="mdl-navigation__link" to='/'>Overview</Link>
                    <Link className="mdl-navigation__link" to='/skills'>Skills</Link>
                    <Link className="mdl-navigation__link" to="/work-experience">Work Experience</Link>
                    <Link className="mdl-navigation__link" to="/competitive-programming">Programming</Link>
                    <Link className="mdl-navigation__link" to="/open-source">Open Source</Link>
                    <Link className="mdl-navigation__link" to="/education">Education</Link>
                    <Link className="mdl-navigation__link" to="/projects">Projects</Link>
                    <a className="mdl-navigation__link" href="http://bit.ly/201905ManishBishtResume" target="_blank" rel="noopener noreferrer">Resume</a>
                    <a className="mdl-navigation__link" href="https://github.com/manishbisht" target="_blank" rel="noopener noreferrer">Code on Github</a>
                    <a className="mdl-navigation__link" href="https://medium.com/@manishbisht" target="_blank" rel="noopener noreferrer">Blog on Medium</a>
                    <Link className="mdl-navigation__link" to="/contact">Contact</Link>
                </nav>
            </div>
        );
    }
}

export default Sidebar;
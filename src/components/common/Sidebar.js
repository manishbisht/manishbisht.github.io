import React, { Component } from 'react';

class Sidebar extends Component {
    render() {
        return (
            <div className="mdl-layout__drawer">
                <nav className="mdl-navigation">
                    <a className="mdl-navigation__link" href="/">Overview</a>
                    <a className="mdl-navigation__link" href="skills">Skills</a>
                    <a className="mdl-navigation__link" href="work-experience">Work Experience</a>
                    <a className="mdl-navigation__link" href="competitive-programming">Programming</a>
                    <a className="mdl-navigation__link" href="open-source">Open Source</a>
                    <a className="mdl-navigation__link" href="education">Education</a>
                    <a className="mdl-navigation__link" href="projects">Projects</a>
                    <a className="mdl-navigation__link" href="https://goo.gl/HeU6oa" target="_blank" rel="noopener noreferrer">Resume</a>
                    <a className="mdl-navigation__link" href="https://github.com/manishbisht" target="_blank" rel="noopener noreferrer">Code on
                        Github</a>
                    <a className="mdl-navigation__link" href="https://medium.com/@manishbisht" target="_blank" rel="noopener noreferrer">Blog on
                        Medium</a>
                    <a className="mdl-navigation__link" href="contact">Contact</a>
                </nav>
            </div>
        );
    }
}

export default Sidebar;
import React, { Component } from 'react';
import ProjectsData from '../../data/projects'
import BigBox from '../BigBox'
import SmallBox from '../SmallBox'

class Projects extends Component {
    getFeaturedProjectsData() {
        return ProjectsData.slice(0, 2).map((project, index) => {
            return <BigBox key={'project' + index} data={project} />
        })
    }

    getProjectsData() {
        return ProjectsData.slice(2).map((project, index) => {
            return <SmallBox key={'project' + index} data={project} />
        })
    }

    render() {
        return (
            <div>
                <h1 align="center"><strong>My Projects</strong></h1>
                <div className="mdl-grid grid">
                    {this.getFeaturedProjectsData()}
                    {this.getProjectsData()}
                </div>
            </div>
        );
    }
}

export default Projects;
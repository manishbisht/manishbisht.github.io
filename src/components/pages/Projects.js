import React from "react";
import ProjectsData from "../../data/projects";
import BigBox from "../BigBox";
import SmallBox from "../SmallBox";

const Projects = () => {
    const getFeaturedProjectsData = () => {
        return ProjectsData.slice(0, 2).map((project, index) => {
            return <BigBox key={"project" + index} data={project} />;
        });
    };

    const getProjectsData = () => {
        return ProjectsData.slice(2).map((project, index) => {
            return <SmallBox key={"project" + index} data={project} />;
        });
    };

    return (
        <div>
            <h1 align="center">
                <strong>My Projects</strong>
            </h1>
            <div className="mdl-grid grid">
                {getFeaturedProjectsData()}
                {getProjectsData()}
            </div>
        </div>
    );
};

export default Projects;

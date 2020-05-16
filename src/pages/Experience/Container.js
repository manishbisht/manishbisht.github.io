import React from "react";
import { ExperienceContainer } from "./style";
import WorkExperienceData from "../../data/work-experience.json";
import { CardComponent } from "../../components";

const Experience = () => {
    const renderWorkExperience = () => {
        return WorkExperienceData.map((experience, index) => (
            <CardComponent key={`experience-${index}`} data={experience} />
        ));
    };

    return (
        <ExperienceContainer id="/work-experience">
            {renderWorkExperience()}
        </ExperienceContainer>
    );
};

export default Experience;

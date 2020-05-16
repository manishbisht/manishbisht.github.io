import React from "react";
import { EducationContainer } from "./style";
import EducationData from "../../data/education.json";
import { CardComponent } from "../../components";

const Education = () => {
    const renderEductionDetails = () => {
        return EducationData.map((education, index) => (
            <CardComponent key={`education-${index}`} data={education} />
        ));
    };

    return <EducationContainer>{renderEductionDetails()}</EducationContainer>;
};

export default Education;

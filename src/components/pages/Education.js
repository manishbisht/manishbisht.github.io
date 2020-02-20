import React from "react";
import EducationData from "../../data/education";
import BigBox from "../BigBox";

const Education = () => {
    const getEducationData = () => {
        return EducationData.map((education, index) => {
            return <BigBox key={"education" + index} data={education} />;
        });
    };

    return (
        <div>
            <h1 align="center">
                <strong>Education</strong>
            </h1>
            <div className="mdl-grid grid">{getEducationData()}</div>
        </div>
    );
};

export default Education;

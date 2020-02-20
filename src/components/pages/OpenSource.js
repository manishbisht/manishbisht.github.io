import React from "react";
import EducationData from "../../data/open-source";
import BigBox from "../BigBox";

const OpenSource = () => {
    const getOpenSourceData = () => {
        return EducationData.map((opensource, index) => {
            return <BigBox key={"open-source" + index} data={opensource} />;
        });
    };

    return (
        <div>
            <h1 align="center">
                <strong>Open Source</strong>
            </h1>
            <div className="mdl-grid grid">{getOpenSourceData()}</div>
        </div>
    );
};

export default OpenSource;

import React from 'react';
import WorkExperienceData from '../../data/work-experience'
import BigBox from '../BigBox'

const WorkExperience = () => {
    const getWorkExperienceData = () => {
        return WorkExperienceData.map((workExperience, index) => {
            return <BigBox key={'work-experience' + index} data={workExperience}/>
        })
    };

    return (
        <div>
            <h1 align="center"><strong>Work Experience</strong></h1>
            <div className="mdl-grid grid">
                {getWorkExperienceData()}
            </div>
        </div>
    );
}

export default WorkExperience;
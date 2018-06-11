import React, { Component } from 'react';
import WorkExperienceData from '../../data/work-experience'
import BigBox from '../BigBox'

class WorkExperience extends Component {
    getWorkExperienceData() {
        return WorkExperienceData.map((workExperience, index) => {
            return <BigBox key={'work-experience' + index} data={workExperience} />
        })
    }

    render() {
        return (
            <div>
                <h1 align="center"><strong>Work Experience</strong></h1>
                <div className="mdl-grid grid">
                    {this.getWorkExperienceData()}
                </div>
            </div>
        );
    }
}

export default WorkExperience;
import React, { Component } from 'react';
import EducationData from '../../data/education'
import BigBox from '../BigBox'

class Education extends Component {
    constructor(props) {
        super(props);
    }

    getEducationData() {
        return EducationData.map((education, index) => {
            return <BigBox key={'education' + index} data={education} />
        })
    }

    render() {
        return (
            <div>
                <h1 align="center"><strong>Education</strong></h1>
                <div className="mdl-grid">
                    {this.getEducationData()}
                </div>
            </div>
        );
    }
}

export default Education;
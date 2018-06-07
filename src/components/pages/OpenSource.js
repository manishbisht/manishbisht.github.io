import React, { Component } from 'react';
import EducationData from '../../data/education'
import BigBox from '../BigBox'

class OpenSource extends Component {
    constructor(props) {
        super(props);
    }

    getOpenSourceData() {
        return EducationData.map((opensource, index) => {
            return <BigBox key={'education' + index} data={opensource} />
        })
    }

    render() {
        return (
            <div>
                <h1 align="center"><strong>Education</strong></h1>
                <div className="mdl-grid">
                    {this.getOpenSourceData()}
                </div>
            </div>
        );
    }
}

export default OpenSource;
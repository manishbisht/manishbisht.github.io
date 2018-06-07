import React, { Component } from 'react';
import EducationData from '../../data/open-source'
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
                <h1 align="center"><strong>Open Source</strong></h1>
                <div className="mdl-grid grid">
                    {this.getOpenSourceData()}
                </div>
            </div>
        );
    }
}

export default OpenSource;
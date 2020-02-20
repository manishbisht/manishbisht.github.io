import React from 'react';
import CompetitiveProgrammingData from '../../data/competitive-programming'
import BigBox from '../BigBox'
import SmallBox from "../SmallBox";

const CompetitiveProgramming = () => {
    const getFeaturedCompetitiveProgrammingData = () => {
        return CompetitiveProgrammingData.slice(0, 1).map((competitiveProgramming, index) => {
            return <BigBox key={'competitive-programming' + index} data={competitiveProgramming} />
        })
    };

    const getCompetitiveProgrammingData = () => {
        return CompetitiveProgrammingData.slice(1).map((competitiveProgramming, index) => {
            return <SmallBox key={'competitive-programming' + index} data={competitiveProgramming} />
        })
    };

    return (
        <div>
            <h1 align="center"><strong>Competitive Programming</strong></h1>
            <div className="mdl-grid grid">
                {getFeaturedCompetitiveProgrammingData()}
                {getCompetitiveProgrammingData()}
            </div>
        </div>
    );
};

export default CompetitiveProgramming;
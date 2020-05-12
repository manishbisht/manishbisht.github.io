import React from "react";
import ProfileImage from "../../images/manish_bisht.png";
import {
    ProfileImageContainer,
    ProfileInfoContainer,
    ProfileInfoDetailsContainer,
} from "./style";
import {
    HorizontalFlexBox,
    MainView,
    ResponsiveImage,
} from "../../components/commonStyle";

const HomePage = () => {
    return (
        <HorizontalFlexBox>
            <MainView>
                <ProfileInfoDetailsContainer>
                    <div>Hey Hey,</div>
                    <div>I'm Manish Bisht</div>
                </ProfileInfoDetailsContainer>
                <ProfileImageContainer>
                    <ResponsiveImage src={ProfileImage} />
                </ProfileImageContainer>
            </MainView>
        </HorizontalFlexBox>
    );
};

export default HomePage;

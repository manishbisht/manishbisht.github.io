import React, { useRef } from "react";
import ProfileData from "../../data/personal-details.json";
import NameSound from "../../audio/Manish_Bisht.mp3";
import { LogoMap, FoldedHandsEmoji, AudioIcon } from "../../components/icons";
import {
    AudioContainer,
    HomePageContainer,
    MainViewWrapper,
    ProfileImageContainer,
    ProfileInfoDetailsContainer,
    ProfileInfoDetailsContainerWelcomeText,
    ProfileInfoDetailsContainerDescriptionText,
} from "./style";

const Home = () => {
    const sound = useRef(null);

    const playSound = () => sound.current.play();

    return (
        <HomePageContainer id="/">
            <MainViewWrapper>
                <ProfileInfoDetailsContainer>
                    <ProfileInfoDetailsContainerWelcomeText>
                        Hi Hello नमस्ते <FoldedHandsEmoji />
                    </ProfileInfoDetailsContainerWelcomeText>
                    <ProfileInfoDetailsContainerDescriptionText>
                        {`I'm ${ProfileData.name}`}
                        <audio ref={sound} src={NameSound} preload="auto" />
                        <AudioContainer onClick={() => playSound()}>
                            <AudioIcon />
                        </AudioContainer>
                    </ProfileInfoDetailsContainerDescriptionText>
                </ProfileInfoDetailsContainer>
                <ProfileImageContainer>
                    <LogoMap.ProfileImage />
                </ProfileImageContainer>
            </MainViewWrapper>
        </HomePageContainer>
    );
};

export default Home;

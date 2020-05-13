import React, { useRef } from "react";
import ProfileImage from "../../images/manish_bisht.png";
import { ResponsiveImage } from "../../components/commonStyle";
import {
    HomePageContainer,
    MainViewWrapper,
    ProfileImageContainer,
    ProfileInfoDetailsContainer,
} from "./style";
import NameSound from "../../audio/Manish_Bisht.mp3";

const HomePage = () => {
    const sound = useRef(null);

    const playSound = () => sound.current.play();

    return (
        <HomePageContainer>
            <MainViewWrapper>
                <ProfileInfoDetailsContainer>
                    <div>Hey Hey,</div>
                    <div>
                        I'm Manish Bisht
                        <audio ref={sound} src={NameSound} preload="auto" />
                        <input
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAQAAAC1QeVaAAAAi0lEQVQokWNgQAYyQFzGsIJBnwED8DNcBpK+DM8YfjMUokqxMRxg+A9m8TJsBLLSEFKMDCuBAv/hCncxfGWQhUn2gaVAktkMXkBSHmh0OwNU8D9csoHhO4MikN7BcAGb5H+GYiDdCTQYq2QubkkkY/E6CLtXdiJ7BTMQMnAHXxFm6IICvhwY8AYQLgCw2U9d90B8BAAAAABJRU5ErkJggg=="
                            height="14"
                            type="image"
                            width="14"
                            onClick={() => playSound()}
                            alt="name-sound"
                        />
                    </div>
                </ProfileInfoDetailsContainer>
                <ProfileImageContainer>
                    <ResponsiveImage src={ProfileImage} />
                </ProfileImageContainer>
            </MainViewWrapper>
        </HomePageContainer>
    );
};

export default HomePage;

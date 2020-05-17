import React from "react";
import ProfileData from "../../data/personal-details.json";
import { useScrollToTop } from "../hooks";
import { ManTechnologystEmoji } from "../icons";
import {
    Bar,
    Hamburger,
    HeaderContainer,
    HeaderDesktopIcon,
    HeaderIconWrapper,
    HeaderTitle,
    MenuContainer,
    MenuItem,
} from "./style";

const Header = () => {
    const [showNavigationItems, setShowNavigationItems] = useScrollToTop();

    return (
        <HeaderContainer>
            <HeaderIconWrapper>
                <Hamburger
                    onClick={() => setShowNavigationItems(!showNavigationItems)}
                >
                    <Bar open={showNavigationItems} />
                    <Bar open={showNavigationItems} />
                    <Bar open={showNavigationItems} />
                    <Bar open={showNavigationItems} />
                </Hamburger>
            </HeaderIconWrapper>
            <HeaderDesktopIcon>
                <ManTechnologystEmoji />
            </HeaderDesktopIcon>
            <HeaderTitle href="/#/">{ProfileData.name}</HeaderTitle>
            <MenuContainer show={showNavigationItems}>
                <MenuItem href="/#/work-experience">Work Experience</MenuItem>
                <MenuItem href="/#/education">Education</MenuItem>
                <MenuItem
                    onClick={() => setShowNavigationItems(false)}
                    href="http://bit.ly/202001ManishBishtResume"
                    rel="noopener"
                    target="_blank"
                >
                    Resume
                </MenuItem>
            </MenuContainer>
        </HeaderContainer>
    );
};

export default Header;

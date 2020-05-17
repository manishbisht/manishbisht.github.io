import styled from "styled-components";
import { COLORS, VIEWPORT_WIDTHS } from "../../utills/Constants";
import {
    HorizontalFlexBox,
    MainView,
    VerticalFlexBox,
} from "../../components/commonStyle";

export const HomePageContainer = styled(HorizontalFlexBox)``;

export const MainViewWrapper = styled(MainView)`
    max-height: unset;
    padding-top: 0;
    background-color: ${COLORS.PRIMARY_COLOR};

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        max-height: 496px;
        padding-top: 100px;
    }
`;

export const ProfileInfoDetailsContainer = styled(HorizontalFlexBox)`
    font-weight: bold;
    color: ${COLORS.PRIMARY_TEXT_COLOR};
    font-size: 28px;
    line-height: 40px;
    min-height: calc(100% - 100vw + 4px);

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        font-size: 38px;
        line-height: 50px;
        min-height: unset;
    }
`;

export const ProfileInfoDetailsContainerWelcomeText = styled(VerticalFlexBox)`
    svg {
        width: 40px;
        margin-left: 8px;
    }

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        svg {
            width: 50px;
        }
    }
`;

export const ProfileInfoDetailsContainerDescriptionText = styled(
    VerticalFlexBox
)`
    svg {
        width: 18px;
        margin-top: 4px;
        margin-left: 8px;
    }
`;

export const AudioContainer = styled.div`
    cursor: pointer;
`;

export const ProfileImageContainer = styled.div`
    min-width: unset;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        min-width: 500px;
    }
`;

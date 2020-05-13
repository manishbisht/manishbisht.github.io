import styled from "styled-components";
import { VIEWPORT_WIDTHS } from "../../utills/Constants";
import { HorizontalFlexBox, MainView } from "../../components/commonStyle";

export const HomePageContainer = styled(HorizontalFlexBox)``;

export const MainViewWrapper = styled(MainView)`
    max-height: unset;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        max-height: 500px;
    }
`;

export const ProfileInfoDetailsContainer = styled(HorizontalFlexBox)`
    min-height: calc(100% - 100vw + 4px);
    font-size: 38px;
    font-weight: bold;
    line-height: 52px;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        min-height: unset;
    }
`;

export const ProfileImageContainer = styled.div``;

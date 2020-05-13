import styled from "styled-components";
import { VIEWPORT_WIDTHS } from "../utills/Constants";

export const VerticalFlexBox = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HorizontalFlexBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const MainView = styled(HorizontalFlexBox)`
    height: 100vh;
    width: 100%;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        flex-direction: row;
        justify-content: space-around;
    }
`;

export const ResponsiveImage = styled.img`
    width: 100%;
    height: auto;
`;

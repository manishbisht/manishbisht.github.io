import styled from "styled-components";
import { COLORS, VIEWPORT_WIDTHS } from "../utills/Constants";

export const Title1 = styled.h1`
    font-size: 32px;
    margin: 0;
`;

export const Title2 = styled.h2`
    font-size: 28px;
`;

export const Title3 = styled.h3`
    font-size: 24px;
`;

export const Title4 = styled.h4`
    font-size: 20px;
`;

export const Title5 = styled.h5`
    font-size: 16px;
    margin: 0;
`;

export const Title6 = styled.h6`
    font-size: 14px;
    margin: 0;
`;

export const PrimaryButton = styled.a`
    background: ${COLORS.TEXT_COLOR};
    color: ${COLORS.WHITE};
    font-size: 12px;
    font-weight: bold;
    padding: 8px;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid ${COLORS.TEXT_COLOR};

    &:hover {
        background: ${COLORS.WHITE};
        color: ${COLORS.TEXT_COLOR};
    }
`;

export const MobileOnlyContainer = styled.div`
    display: block;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        display: none;
    }
`;

export const DesktopOnlyContainer = styled.div`
    display: none;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        display: block;
    }
`;

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

export const AppContainer = styled.div`
    color: ${COLORS.TEXT_COLOR};
    margin-top: 64px;
`;

export const MainView = styled(HorizontalFlexBox)`
    height: calc(100vh - 64px);
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

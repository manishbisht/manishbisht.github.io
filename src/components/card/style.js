import styled from "styled-components";
import { COLORS, VIEWPORT_WIDTHS } from "../../utills/Constants";
import {
    HorizontalFlexBox,
    Title3,
    Title5,
    VerticalFlexBox,
} from "../commonStyle";

export const CardContainer = styled(HorizontalFlexBox)`
    margin: 16px 16px 0;
    padding: 32px 16px;
    box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
        0px 8px 10px 1px rgba(0, 0, 0, 0.14),
        0px 3px 14px 2px rgba(0, 0, 0, 0.12);
    width: calc(100% - 64px);

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        flex-direction: row;
    }
`;

export const CardHeader = styled(HorizontalFlexBox)`
    width: 100%;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        width: 40%;
    }
`;

export const CardBody = styled(HorizontalFlexBox)`
    align-items: flex-start;
    width: 100%;
    padding-left: 0;
    padding-top: 16px;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        width: 60%;
        padding-left: 16px;
        padding-top: 0;
    }
`;

export const CardTitle = styled(Title3)`
    padding-bottom: 4px;
`;

export const CardSubTitle = styled(Title5)`
    border-bottom: 3px solid ${COLORS.TEXT_COLOR};
    text-transform: uppercase;
    padding: 2px 0;
`;

export const CardListWrapper = styled.ul``;

export const CardListItem = styled.li`
    ${({ isLink = false }) => isLink && "word-break: break-all;"}
`;

export const CardActionButtons = styled(VerticalFlexBox)`
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;

    a {
        margin: 4px;
    }
`;

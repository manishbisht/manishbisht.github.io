import styled from "styled-components";
import { COLORS } from "../../utills/Constants";
import { HorizontalFlexBox, VerticalFlexBox } from "../commonStyle";

export const FooterContainer = styled.footer`
    margin: 48px 16px;
`;

export const FooterSupportingContainer = styled(HorizontalFlexBox)`
    h4 {
        margin-top: 16px;
        margin-bottom: 12px;
        text-align: center;
    }
`;

export const FooterSupportingContainerContact = styled.a`
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    text-decoration: none;
    color: ${COLORS.TEXT_COLOR};
`;

export const SocialMediaIconsWrapper = styled(VerticalFlexBox)`
    justify-content: center;
    margin-top: 24px;
`;

export const SocialMediaIconWrapper = styled.a`
    width: 40px;
    height: 40px;
    margin-right: 16px;

    &:last-child {
        margin-right: 0;
    }
`;

export const FooterTextContainer = styled(VerticalFlexBox)`
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 24px;

    svg {
        width: 27px;
        padding: 0px 4px;
    }
`;

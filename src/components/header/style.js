import styled from "styled-components";
import {
    DesktopOnlyContainer,
    HorizontalFlexBox,
    MobileOnlyContainer,
} from "../commonStyle";
import { COLORS, VIEWPORT_WIDTHS } from "../../utills/Constants";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
        0px 4px 5px 0px rgba(0, 0, 0, 0.14),
        0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const HeaderIconWrapper = styled(MobileOnlyContainer)`
    margin-left: 17px;
`;

export const Hamburger = styled(HorizontalFlexBox)`
    width: 36px;
    height: 24px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    cursor: pointer;
`;

export const Bar = styled.div`
    display: block;
    position: absolute;
    height: 4px;
    width: 100%;
    background: ${COLORS.TEXT_COLOR};
    border-radius: 4px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;

    &:nth-child(1) {
        top: 0px;
    }

    &:nth-child(2),
    &:nth-child(3) {
        top: 10px;
    }

    &:nth-child(4) {
        top: 20px;
    }

    ${({ open = false }) =>
        open &&
        `
        &:nth-child(1) {
            top: 18px;
            width: 0%;
            left: 50%;
        }

        &:nth-child(2) {
            -webkit-transform: rotate(45deg);
            -moz-transform: rotate(45deg);
            -o-transform: rotate(45deg);
            transform: rotate(45deg);
        }

        &:nth-child(3) {
            -webkit-transform: rotate(-45deg);
            -moz-transform: rotate(-45deg);
            -o-transform: rotate(-45deg);
            transform: rotate(-45deg);
        }

        &:nth-child(4) {
            top: 18px;
            width: 0%;
            left: 50%;
        }
    `}
`;

export const HeaderDesktopIcon = styled(DesktopOnlyContainer)`
    margin-left: 0;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        margin-left: 50px;
    }
`;

export const HeaderTitle = styled.a`
    flex-grow: 1;
    font-size: 24px;
    font-weight: bold;
    margin-right: 40px;
    margin-left: 0;
    text-align: center;
    color: ${COLORS.TEXT_COLOR};
    text-decoration: none;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        margin-left: 18px;
        margin-right: 0;
        text-align: left;
    }
`;

export const MenuContainer = styled.nav`
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    flex-direction: column;
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: #ffffff;

    display: ${({ show = false }) => (show ? "flex" : "none")};

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        display: flex;
        flex-direction: row;
        position: relative;
        top: initial;
        left: initial;
        width: auto;
        height: auto;
    }
`;

export const MenuItem = styled.a`
    color: ${COLORS.TEXT_COLOR};
    display: block;
    margin-right: 0;
    margin-bottom: 16px;
    text-decoration: none;

    @media (min-width: ${VIEWPORT_WIDTHS.TAB}px) {
        margin-right: 25px;
        margin-bottom: 0;

        &:last-child {
            margin-right: 50px;
        }
    }
`;

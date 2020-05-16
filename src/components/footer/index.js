import React from "react";
import {
    FooterContainer,
    FooterSupportingContainer,
    FooterSupportingContainerContact,
    FooterTextContainer,
    SocialMediaIconsWrapper,
    SocialMediaIconWrapper,
} from "./style";
import {
    FacebookIcon,
    TwitterIcon,
    InstagramIcon,
    LinkedInIcon,
    GithubIcon,
    PinterestIcon,
    MediumIcon,
    HeartIcon,
} from "../icons";
import { Title1, Title4 } from "../commonStyle";

const Footer = () => {
    return (
        <FooterContainer>
            <FooterSupportingContainer>
                <Title1>Hire me !!</Title1>
                <Title4>
                    I'm currently open for new opportunities. Would you like to
                    discuss yours ?
                </Title4>
                <FooterSupportingContainerContact href="tel:+918559874393">
                    +91-8559874393
                </FooterSupportingContainerContact>
                <FooterSupportingContainerContact href="mailto:hi@manishbisht.me">
                    hi@manishbisht.me
                </FooterSupportingContainerContact>
                <FooterSupportingContainerContact href="mailto:manish.bisht490@gmail.com">
                    manish.bisht490@gmail.com
                </FooterSupportingContainerContact>
            </FooterSupportingContainer>
            <SocialMediaIconsWrapper>
                <SocialMediaIconWrapper
                    href="http://fb.com/imanishbisht"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <FacebookIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://twitter.com/ManishBisht02"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <TwitterIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://www.instagram.com/manishbisht02"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <InstagramIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://www.linkedin.com/in/manishbisht02"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <LinkedInIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://github.com/manishbisht"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <GithubIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://www.pinterest.com/imanishbisht"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <PinterestIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    href="https://medium.com/@manishbisht"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <MediumIcon />
                </SocialMediaIconWrapper>
            </SocialMediaIconsWrapper>
            <FooterTextContainer>
                Made with <HeartIcon /> in India
            </FooterTextContainer>
        </FooterContainer>
    );
};

export default Footer;

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
                    discuss any new opportunity ?
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
                    aria-label="Facebook"
                    href="http://fb.com/imanishbisht"
                    rel="noopener"
                    target="_blank"
                >
                    <FacebookIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="Twitter"
                    href="https://twitter.com/ManishBisht02"
                    rel="noopener"
                    target="_blank"
                >
                    <TwitterIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="Instagram"
                    href="https://www.instagram.com/manishbisht02"
                    rel="noopener"
                    target="_blank"
                >
                    <InstagramIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="LinkedIn"
                    href="https://www.linkedin.com/in/manishbisht02"
                    rel="noopener"
                    target="_blank"
                >
                    <LinkedInIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="Github"
                    href="https://github.com/manishbisht"
                    rel="noopener"
                    target="_blank"
                >
                    <GithubIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="Pinterest"
                    href="https://www.pinterest.com/imanishbisht"
                    rel="noopener"
                    target="_blank"
                >
                    <PinterestIcon />
                </SocialMediaIconWrapper>
                <SocialMediaIconWrapper
                    aria-label="Medium"
                    href="https://medium.com/@manishbisht"
                    rel="noopener"
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

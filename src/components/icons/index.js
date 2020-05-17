import React from "react";
import { ResponsiveImage } from "../commonStyle";

import ProfileData from "../../data/personal-details.json";

import ProfileImage from "../../images/manish_bisht.webp";

import BookMyShowIcon from "./BookMyShow";
import UdacityLogo from "./Udacity";

import CovalentCapitalImage from "../../images/covalent-capital.png";
import FBOpenSourceImage from "../../images/fbopensource-logo.jpg";
import GSOCImage from "../../images/gsoc2016-logo.jpg";
import BlueCubeNetworkImage from "../../images/bluecubenetwork-logo.jpg";
import Run4OffersImage from "../../images/run4offers-logo.jpg";
import SKITImage from "../../images/skit-logo.jpg";
import DPSImage from "../../images/dps-logo.jpg";

export { default as FacebookIcon } from "./Facebook";
export { default as TwitterIcon } from "./Twitter";
export { default as InstagramIcon } from "./Instagram";
export { default as LinkedInIcon } from "./LinkedIn";
export { default as GithubIcon } from "./Github";
export { default as PinterestIcon } from "./Pinterest";
export { default as MediumIcon } from "./Medium";
export { default as HeartIcon } from "./Heart";
export { default as AudioIcon } from "./Audio";

export { default as FoldedHandsEmoji } from "./FoldedHands";

export const ManTechnologystEmoji = () => (
    <ResponsiveImage src="data:image/png;base64,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" />
);

export const LogoMap = {
    ProfileImage: () => (
        <ResponsiveImage src={ProfileImage} alt={ProfileData.name} />
    ),
    BookMyShow: BookMyShowIcon,
    CovalentCapital: () => (
        <ResponsiveImage src={CovalentCapitalImage} alt="CovalentCapital" />
    ),
    Udacity: () => <UdacityLogo width="50%" />,
    FBOpenSource: () => (
        <ResponsiveImage src={FBOpenSourceImage} alt="FBOpenSource" />
    ),
    GSOC: () => <ResponsiveImage src={GSOCImage} alt="FBOpenSource" />,
    BlueCubeNetwork: () => (
        <ResponsiveImage src={BlueCubeNetworkImage} alt="Facebook OpenSource" />
    ),
    Run4Offers: () => (
        <ResponsiveImage src={Run4OffersImage} alt="Run4Offers" />
    ),
    SKIT: () => <ResponsiveImage src={SKITImage} alt={ProfileData.alumniOf} />,
    DPS: () => <ResponsiveImage src={DPSImage} alt="Defence Public School" />,
};

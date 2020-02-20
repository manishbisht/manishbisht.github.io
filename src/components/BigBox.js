import React from "react";
import UdacityImage from "../images/udacity-logo.png";
import DPSImage from "../images/dps-logo.jpg";
import SKITImage from "../images/skit-logo.jpg";
import FBOpenSourceImage from "../images/fbopensource-logo.jpg";
import GSOCImage from "../images/gsoc2016-logo.jpg";
import PhpMyAdminImage from "../images/phpmyadmin-logo.png";
import OpenCloudImage from "../images/owncloud-logo.png";
import NextCloudImage from "../images/nextcloud-logo.jpg";
import SaveTheLinkImage from "../images/save-the-link.png";
import ngDownloaderImage from "../images/angular-attack-2017.png";
import Run4OffersImage from "../images/run4offers-logo.jpg";
import BlueCubeNetworkImage from "../images/bluecubenetwork-logo.jpg";
import CovalentCapitalImage from "../images/covalent-capital.png";
import GCJImage from "../images/googlecodejam-logo.jpg";

const BigBox = props => {
    const renderImage = () => {
        let imageData = null;
        if (props.data.image === "Udacity") {
            imageData = {
                type: "JPG",
                data: UdacityImage,
            };
        } else if (props.data.image === "SKIT") {
            imageData = {
                type: "JPG",
                data: SKITImage,
            };
        } else if (props.data.image === "DPS") {
            imageData = {
                type: "JPG",
                data: DPSImage,
            };
        } else if (props.data.image === "FBOpenSource") {
            imageData = {
                type: "JPG",
                data: FBOpenSourceImage,
            };
        } else if (props.data.image === "GSOC") {
            imageData = {
                type: "JPG",
                data: GSOCImage,
            };
        } else if (props.data.image === "PhpMyAdmin") {
            imageData = {
                type: "JPG",
                data: PhpMyAdminImage,
            };
        } else if (props.data.image === "OpenCloud") {
            imageData = {
                type: "JPG",
                data: OpenCloudImage,
            };
        } else if (props.data.image === "NextCloud") {
            imageData = {
                type: "JPG",
                data: NextCloudImage,
            };
        } else if (props.data.image === "SaveTheLink") {
            imageData = {
                type: "JPG",
                data: SaveTheLinkImage,
            };
        } else if (props.data.image === "ngDownloader") {
            imageData = {
                type: "JPG",
                data: ngDownloaderImage,
            };
        } else if (props.data.image === "CovalentCapital") {
            imageData = {
                type: "JPG",
                data: CovalentCapitalImage,
            };
        } else if (props.data.image === "BlueCubeNetwork") {
            imageData = {
                type: "JPG",
                data: BlueCubeNetworkImage,
            };
        } else if (props.data.image === "Run4Offers") {
            imageData = {
                type: "JPG",
                data: Run4OffersImage,
            };
        } else if (props.data.image === "GCJ") {
            imageData = {
                type: "JPG",
                data: GCJImage,
            };
        } else if (props.data.image === "BookMyShow") {
            imageData = {
                type: "SVG",
                data: (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="-1 -1 123 37"
                        id="icon-bms-logo-new"
                    >
                        <g fill="none" fillRule="evenodd">
                            <path
                                d="M35.4 10.31l-2-3.38-3.55 1.69-2-3.39-3.55 1.7-1.99-3.4-3.55 1.7-2-3.39-3.55 1.7-1.99-3.4-3.56 1.7L.13 26.36l9.15 2.8a4.85 4.85 0 0 1 9.48 1.42v.1c.02.44-.03.88-.16 1.32l9.3 2.85 7.5-24.54z"
                                fill="#D61920"
                                mask="url(#mask-2)"
                                transform="translate(40.8)"
                            ></path>
                            <path
                                d="M48.78 24.34a.98.98 0 0 1-.82-.98v-12a.99.99 0 0 1 1-1h8.67a3.89 3.89 0 0 1 3.9 3.88v9.12a1 1 0 0 1-1.19.98.98.98 0 0 1-.81-.98v-9.11a1.9 1.9 0 0 0-1.9-1.9h-1.89v11a1 1 0 0 1-.3.72.99.99 0 0 1-.88.27.98.98 0 0 1-.82-.98V12.35h-3.78v11a1 1 0 0 1-1.18.99m14.42 5.23a.98.98 0 0 1-.82-.99 1 1 0 0 1 .29-.7 1 1 0 0 1 .7-.3c.85 0 1.58-.54 1.82-1.35l1.03-3.43-3.37-11.27a1 1 0 0 1 .66-1.26 1.02 1.02 0 0 1 1.24.66l2.5 8.4 2.54-8.4c.12-.46.63-.77 1.15-.67l.07.01c.54.17.84.74.68 1.27L68.22 23.1l-1.1 3.7a4 4 0 0 1-1.4 2 3.9 3.9 0 0 1-2.34.78.96.96 0 0 1-.18-.01"
                                fill="#FEFEFE"
                            ></path>
                            <path
                                d="M2.08 18.02h1.96a1.97 1.97 0 0 0 1.97-1.97v-5.77A1.97 1.97 0 0 0 4.05 8.3H2.08V18zM.85 20.08A1.02 1.02 0 0 1 0 19.06V1.14A1.03 1.03 0 0 1 .3.4a1.03 1.03 0 0 1 .92-.3c.5.1.86.52.86 1.03v5.1h1.96a4.04 4.04 0 0 1 4.05 4.04v5.77a4.05 4.05 0 0 1-4.04 4.04H1.04a.92.92 0 0 1-.2-.01z"
                                fill="#333545"
                                mask="url(#mask-4)"
                                transform="translate(0 4.13)"
                            ></path>
                            <path
                                d="M15.14 12.35a2.01 2.01 0 0 0-.34-.03 1.95 1.95 0 0 0-1.97 1.97v6.01a1.96 1.96 0 0 0 1.97 1.97 1.97 1.97 0 0 0 1.97-1.97v-6c0-.97-.69-1.78-1.63-1.95M14.09 24.3a4.04 4.04 0 0 1-3.34-3.99V14.3a4 4 0 0 1 1.19-2.86 4.03 4.03 0 0 1 2.86-1.18 4.04 4.04 0 0 1 4.04 4.04v6.01c0 1.08-.42 2.1-1.19 2.87a4.02 4.02 0 0 1-2.85 1.18 4.03 4.03 0 0 1-.71-.06m11.8-11.94a2 2 0 0 0-.34-.03 1.95 1.95 0 0 0-1.97 1.97v6.01a1.96 1.96 0 0 0 1.97 1.97 1.96 1.96 0 0 0 1.97-1.97V14.3c0-.96-.69-1.77-1.63-1.94M24.84 24.3a4.04 4.04 0 0 1-3.33-3.99V14.3a4.05 4.05 0 0 1 4.74-3.98 4.04 4.04 0 0 1 3.35 3.98v6.01a4.01 4.01 0 0 1-1.2 2.87 4.02 4.02 0 0 1-2.85 1.18c-.24 0-.48-.02-.71-.06m8.27.04a1.02 1.02 0 0 1-.85-1.02V5.27c0-.28.1-.55.3-.74a1.03 1.03 0 0 1 .91-.28c.5.08.87.51.87 1.02v10.68l4.78-5.36c.24-.26.6-.38.96-.32a1.03 1.03 0 0 1 .6 1.7L37.07 16l3.73 6.83a1 1 0 0 1 .1.77 1.02 1.02 0 0 1-.51.62 1.03 1.03 0 0 1-.7.12 1.03 1.03 0 0 1-.72-.5l-3.36-6.18-1.28 1.41v4.25a1.04 1.04 0 0 1-1.04 1.04c-.07 0-.13 0-.2-.02m45.83-.01a3.83 3.83 0 0 1-2.7-1.89 1.06 1.06 0 0 1-.1-.8c.08-.26.25-.48.48-.62a1.05 1.05 0 0 1 .7-.11c.3.05.57.23.72.5.27.46.7.76 1.23.85a1.84 1.84 0 0 0 1.54-.44c.4-.37.6-.9.55-1.42a1.7 1.7 0 0 0-.75-1.34l-2.8-1.99a3.79 3.79 0 0 1-1.6-2.8 3.7 3.7 0 0 1 1.23-3 3.76 3.76 0 0 1 3.08-.97c1.18.2 2.14.88 2.69 1.84a1.06 1.06 0 0 1-.38 1.42 1.03 1.03 0 0 1-.7.12 1.03 1.03 0 0 1-.72-.5 1.67 1.67 0 0 0-1.18-.8 1.63 1.63 0 0 0-1.4.41 1.7 1.7 0 0 0-.53 1.34c.02.49.3.97.72 1.25l2.8 1.95a3.81 3.81 0 0 1 1.62 2.93 3.72 3.72 0 0 1-1.25 3.09 3.88 3.88 0 0 1-3.18 1l-.08-.02zm8.03.03a1.04 1.04 0 0 1-.86-1.02V5.29a1.03 1.03 0 0 1 1.04-1.04l.2.01c.5.1.84.51.84 1.03v5.1h1.97a4.03 4.03 0 0 1 4.04 4.04v8.9a1.03 1.03 0 0 1-1.21 1.02c-.5-.09-.86-.52-.86-1.03v-8.9a1.96 1.96 0 0 0-1.97-1.96h-1.97v10.87a1.03 1.03 0 0 1-1.22 1.02m14.28-11.98a1.96 1.96 0 0 0-2.31 1.94v6.01a1.96 1.96 0 0 0 1.96 1.97c.52 0 1.02-.2 1.39-.57a1.95 1.95 0 0 0 .58-1.4V14.3c0-.96-.68-1.78-1.63-1.94m-1.05 11.93a4.03 4.03 0 0 1-3.33-3.98V14.3a4.05 4.05 0 0 1 4.74-3.99 4.04 4.04 0 0 1 3.35 3.99v6.01a4 4 0 0 1-1.2 2.86 4.02 4.02 0 0 1-3.56 1.12"
                                fill="#333545"
                            ></path>
                            <path
                                d="M14.07 1.29a1 1 0 0 0-.1-.76 1.07 1.07 0 0 0-.68-.48 1.03 1.03 0 0 0-1.19.76c0 .05-1.12 4.56-2 7.99l-.02.07-.02-.07-2-7.98a.97.97 0 0 0-.8-.77 1.08 1.08 0 0 0-.18-.02c-.46 0-.86.32-.99.78-.01.05-1.13 4.56-2 7.99l-.02.07-.02-.07c-.85-3.43-2-7.94-2-7.99a1.02 1.02 0 0 0-.81-.76A1.02 1.02 0 0 0 .07 1.29l3.01 12.03a1.04 1.04 0 0 0 .99.78c.49 0 .88-.32.98-.78l2-7.99.03-.07.02.07c.88 3.47 2 8 2 8a1.05 1.05 0 0 0 .98.77.98.98 0 0 0 .99-.78l3-12.03z"
                                fill="#333545"
                                mask="url(#mask-6)"
                                transform="translate(106.83 10.25)"
                            ></path>
                        </g>
                    </svg>
                ),
            };
        }

        if (imageData) {
            if (imageData.type === "SVG") {
                return <div className="img-responsive">{imageData.data}</div>;
            } else {
                return (
                    <img
                        src={imageData.data}
                        className="img-responsive"
                        alt={props.data.image}
                    />
                );
            }
        }
    };

    const getDescriptionHTML = () => {
        if (props.data.description) {
            return <p>{props.data.description}</p>;
        }
    };

    const getDescriptionLinksHTML = () => {
        if (props.data.descriptionLinks) {
            let listitems = props.data.descriptionLinks.map((item, index) => {
                return <li key={"boxItem" + index}>{item.data}</li>;
            });
            return <ul>{listitems}</ul>;
        }
    };

    const getButtonsHTML = () => {
        if (props.data.links) {
            return props.data.links.map((link, index) => {
                return (
                    <a
                        key={"big-box" + index}
                        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <strong>{link.title}</strong>
                    </a>
                );
            });
        }
    };

    return (
        <div className="mdl-cell--12-col mdl-shadow--4dp grid-large-box">
            <div className="mdl-grid">
                <div className="mdl-cell--6-col">{renderImage()}</div>
                <div className="mdl-cell--6-col grid-large-box-details">
                    <h3>{props.data.title}</h3>
                    <br />
                    <h4>
                        <strong>{props.data.subTitle}</strong>
                    </h4>
                    {getDescriptionHTML()}
                    {getDescriptionLinksHTML()}
                    <center>{getButtonsHTML()}</center>
                </div>
            </div>
        </div>
    );
};

export default BigBox;

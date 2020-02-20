import React from "react";
import ProfileData from "./../../data/personal-details";

const Contact = () => (
    <div className="view" align="center">
        <i className="material-icons" style={{ fontSize: 100 }}>
            place
        </i>
        <br />
        <h3>
            E-39 Karni Nagar, Gandhi Path,
            <br />
            Near Bhaskar Vidhya Ashram,
            <br />
            Gandhi Path, Vaishali Nagar,
            <br />
            Jaipur, Rajasthan (India)
            <br />
            <i className="material-icons">call</i>
            <span className="mobile-number">{ProfileData.telephone}</span>
            <br />
        </h3>
        <div className="social">
            <span className="symbol">
                <a
                    className="plinks facebook"
                    href="http://fb.com/imanishbisht"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    circlefacebook
                </a>
            </span>
            <span className="symbol">
                <a
                    className="plinks twitter"
                    rel="noopener noreferrer"
                    href="https://twitter.com/ManishBisht02"
                    target="_blank"
                >
                    circletwitterbird
                </a>
            </span>
            <span className="symbol">
                <a
                    className="plinks googleplus"
                    rel="noopener noreferrer"
                    href="https://plus.google.com/+ManishBisht02"
                    target="_blank"
                >
                    circlegoogleplus
                </a>
            </span>
            <span className="symbol">
                <a
                    className="plinks instagram"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/manishbisht02"
                    target="_blank"
                >
                    circleinstagram
                </a>
            </span>
            <span className="symbol">
                <a
                    className="plinks linkedin"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/manishbisht02"
                    target="_blank"
                >
                    circlelinkedin
                </a>
            </span>
            <span className="symbol">
                <a
                    className="plinks github"
                    rel="noopener noreferrer"
                    href="https://github.com/manishbisht"
                    target="_blank"
                >
                    circlegithub
                </a>
            </span>
        </div>
    </div>
);

export default Contact;

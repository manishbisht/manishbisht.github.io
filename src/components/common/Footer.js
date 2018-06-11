import React, {Component} from 'react';
import ProfileData from './../../data/personal-details'

class Footer extends Component {
    render() {
        return (
            <div align="center">
                <footer className="mdl-mini-footer">
                    <span className="symbol">
                        <a className="plinks facebook"
                           href="http://fb.com/imanishbisht"
                           rel="noopener noreferrer"
                           target="_blank">
                            circlefacebook
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks twitter"
                           href="https://twitter.com/ManishBisht02"
                           rel="noopener noreferrer"
                           target="_blank">
                            circletwitterbird
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks googleplus"
                           href="https://plus.google.com/+ManishBisht02"
                           rel="noopener noreferrer"
                           target="_blank">
                            circlegoogleplus
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks instagram"
                           href="https://www.instagram.com/manishbisht02"
                           rel="noopener noreferrer"
                           target="_blank">
                            circleinstagram
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks linkedin"
                           href="https://www.linkedin.com/in/manishbisht02"
                           rel="noopener noreferrer"
                           target="_blank">
                            circlelinkedin
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks github"
                           href="https://github.com/manishbisht"
                           rel="noopener noreferrer"
                           target="_blank">
                            circlegithub
                        </a>
                    </span>
                    <span className="symbol">
                        <a className="plinks pinterest"
                           href="https://www.pinterest.ca/imanishbisht/"
                           rel="noopener noreferrer"
                           target="_blank">circlepinterest
                        </a>
                    </span>
                    <br/>
                    <br/>
                    <h3>
                        &copy;
                        <span id="copyright-year">  {(new Date().getFullYear())}</span>
                        &nbsp;{ProfileData.name} &middot; Hosted with&nbsp;
                        <i className="material-icons">favorite</i> on GitHub</h3>
                </footer>
            </div>
        );
    }
}

export default Footer;
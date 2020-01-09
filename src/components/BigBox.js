import React, {Component} from 'react';
import UdacityImage from '../images/udacity-logo.png'
import DPSImage from '../images/dps-logo.jpg'
import SKITImage from '../images/skit-logo.jpg'
import FBOpenSourceImage from '../images/fbopensource-logo.jpg'
import GSOCImage from '../images/gsoc2016-logo.jpg'
import PhpMyAdminImage from '../images/phpmyadmin-logo.png'
import OpenCloudImage from '../images/owncloud-logo.png'
import NextCloudImage from '../images/nextcloud-logo.jpg'
import SaveTheLinkImage from '../images/save-the-link.png'
import ngDownloaderImage from '../images/angular-attack-2017.png'
import Run4OffersImage from '../images/run4offers-logo.jpg'
import BlueCubeNetworkImage from '../images/bluecubenetwork-logo.jpg'
import CovalentCapitalImage from '../images/covalent-capital.png'
import GCJImage from '../images/googlecodejam-logo.jpg'

class BigBox extends Component {
    renderImage() {
        let imageData = null;
        if (this.props.data.image === "Udacity") {
            imageData = {
                type: 'JPG',
                data: UdacityImage
            }
        } else if (this.props.data.image === "SKIT") {
            imageData = {
                type: 'JPG',
                data: SKITImage
            }
        } else if (this.props.data.image === "DPS") {
            imageData = {
                type: 'JPG',
                data: DPSImage
            }
        } else if (this.props.data.image === "FBOpenSource") {
            imageData = {
                type: 'JPG',
                data: FBOpenSourceImage
            }
        } else if (this.props.data.image === "GSOC") {
            imageData = {
                type: 'JPG',
                data: GSOCImage
            }
        } else if (this.props.data.image === "PhpMyAdmin") {
            imageData = {
                type: 'JPG',
                data: PhpMyAdminImage
            }
        } else if (this.props.data.image === "OpenCloud") {
            imageData = {
                type: 'JPG',
                data: OpenCloudImage
            }
        } else if (this.props.data.image === "NextCloud") {
            imageData = {
                type: 'JPG',
                data: NextCloudImage
            }
        } else if (this.props.data.image === "SaveTheLink") {
            imageData = {
                type: 'JPG',
                data: SaveTheLinkImage
            }
        } else if (this.props.data.image === "ngDownloader") {
            imageData = {
                type: 'JPG',
                data: ngDownloaderImage
            }
        } else if (this.props.data.image === "CovalentCapital") {
            imageData = {
                type: 'JPG',
                data: CovalentCapitalImage
            }
        } else if (this.props.data.image === "BlueCubeNetwork") {
            imageData = {
                type: 'JPG',
                data: BlueCubeNetworkImage
            }
        } else if (this.props.data.image === "Run4Offers") {
            imageData = {
                type: 'JPG',
                data: Run4OffersImage
            }
        } else if (this.props.data.image === "GCJ") {
            imageData = {
                type: 'JPG',
                data: GCJImage
            }
        } else if (this.props.data.image === "BookMyShow") {
            imageData = {
                type: 'SVG',
                data: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122 36" enable-background="new 0 0 100 100" xml:space="preserve"><use xlink:href="/icons/common-icons.svg#icon-bms-logo-new"></use></svg>'
            }
        }

        if (imageData) {
            if (imageData.type === "SVG") {
                return imageData.data
            } else {
                return (
                    <img src={imageData.data} className="img-responsive" alt={this.props.data.image}/>
                )
            }
        }
    }

    getDescriptionHTML() {
        if (this.props.data.description) {
            return (
                <p>
                    {this.props.data.description}
                </p>
            )
        }
    }

    getDescriptionLinksHTML() {
        if (this.props.data.descriptionLinks) {
            let listitems = this.props.data.descriptionLinks.map((item, index) => {
                return <li key={'boxItem' + index}>{item.data}</li>
            });
            return (
                <ul>
                    {listitems}
                </ul>
            )
        }
    }

    getButtonsHTML() {
        if (this.props.data.links) {
            return this.props.data.links.map((link, index) => {
                return (
                    <a key={'big-box' + index}
                       className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                       href={link.url}
                       target="_blank"
                       rel="noopener noreferrer">
                        <strong>{link.title}</strong>
                    </a>
                )
            });
        }
    }

    render() {
        return (
            <div className="mdl-cell--12-col mdl-shadow--4dp grid-large-box">
                <div className="mdl-grid">
                    <div className="mdl-cell--6-col">
                        {this.renderImage()}
                    </div>
                    <div className="mdl-cell--6-col grid-large-box-details">
                        <h3>{this.props.data.title}</h3><br/>
                        <h4><strong>{this.props.data.subTitle}</strong></h4>
                        {this.getDescriptionHTML()}
                        {this.getDescriptionLinksHTML()}
                        <center>
                            {this.getButtonsHTML()}
                        </center>
                    </div>
                </div>
            </div>
        );
    }
}

export default BigBox;
import React, { Component } from 'react';
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
    getImageLink(){
        if(this.props.data.image === "Udacity") {
            return UdacityImage
        } else if(this.props.data.image === "SKIT") {
            return SKITImage
        } else if(this.props.data.image === "DPS") {
            return DPSImage
        } else if(this.props.data.image === "FBOpenSource") {
            return FBOpenSourceImage
        } else if(this.props.data.image === "GSOC") {
            return GSOCImage
        } else if(this.props.data.image === "PhpMyAdmin") {
            return PhpMyAdminImage
        } else if(this.props.data.image === "OpenCloud") {
            return OpenCloudImage
        } else if(this.props.data.image === "NextCloud") {
            return NextCloudImage
        } else if(this.props.data.image === "SaveTheLink") {
            return SaveTheLinkImage
        } else if(this.props.data.image === "ngDownloader") {
            return ngDownloaderImage
        } else if(this.props.data.image === "CovalentCapital") {
            return CovalentCapitalImage
        } else if(this.props.data.image === "BlueCubeNetwork") {
            return BlueCubeNetworkImage
        } else if(this.props.data.image === "Run4Offers") {
            return Run4OffersImage
        } else if(this.props.data.image === "GCJ") {
            return GCJImage
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
                    <a key={'big-box' + index} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                       href={link.url} target="_blank">
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
                        <img src={this.getImageLink()} className="img-responsive" alt={this.props.data.image} />
                    </div>
                    <div className="mdl-cell--6-col grid-large-box-details">
                        <h3>{this.props.data.title}</h3><br />
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
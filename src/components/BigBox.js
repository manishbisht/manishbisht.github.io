import React, { Component } from 'react';
import UdacityImage from '../images/udacity-logo.png'
import DPSImage from '../images/dps-logo.jpg'
import SKITImage from '../images/skit-logo.jpg'

class BigBox extends Component {
    constructor(props) {
        super(props);
    }

    getImageLink(){
        if(this.props.data.image === "Udacity") {
            return UdacityImage
        } else if(this.props.data.image === "SKIT") {
            return SKITImage
        } else if(this.props.data.image === "DPS") {
            return DPSImage
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
        return this.props.data.links.map((link, index) => {
            return (
                <a key={'box' + index} className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
                   href={link.url} target="_blank">
                    <strong>{link.title}</strong>
                </a>
            )
        })
    }

    render() {
        return (
            <div className="mdl-cell--12-col mdl-shadow--4dp" style={{margin: 5}}>
                <div className="mdl-grid">
                    <div className="mdl-cell--6-col">
                        <img src={this.getImageLink()} className="img-responsive" />
                    </div>
                    <div className="mdl-cell--6-col">
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
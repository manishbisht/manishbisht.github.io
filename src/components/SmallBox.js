import React, { Component } from 'react';
import FlipkartProductSearchImage from '../images/flipkart-product-search.png'
import ToDoListImage from '../images/hackerearth-internship-online-round.jpg'
import FileExplorerImage from '../images/file-explorer.png'
import FoodHelperImage from '../images/alexa-food-helper.png'
import ContentSearchImage from '../images/alexa-content-search.png'
import ContestNotifyImage from '../images/alexa-contest-notify.jpg'
import FEND1Image from '../images/fd-project1.png'
import FEND2Image from '../images/fd-project2.png'
import FEND3Image from '../images/fd-project3.png'
import FEND4Image from '../images/fd-project4.png'
import FEND5Image from '../images/fd-project5.png'
import FEND6Image from '../images/fd-project6.png'
import ProfileReaderImage from '../images/ProfileReader.jpg'
import CProgrammerImage from '../images/CProgrammer.png'
import FacebookIDCardImage from '../images/FacebookIdCard.jpg'

class SmallBox extends Component {
    getImageLink(){
        if(this.props.data.image === "FlipkartProductSearch") {
            return FlipkartProductSearchImage
        } else if(this.props.data.image === "FileExplorer") {
            return FileExplorerImage
        } else if(this.props.data.image === "ContestNotify") {
            return ContestNotifyImage
        } else if(this.props.data.image === "ToDoList") {
            return ToDoListImage
        } else if(this.props.data.image === "FoodHelper") {
            return FoodHelperImage
        } else if(this.props.data.image === "ContentSearch") {
            return ContentSearchImage
        } else if(this.props.data.image === "FEND1") {
            return FEND1Image
        } else if(this.props.data.image === "FEND2") {
            return FEND2Image
        } else if(this.props.data.image === "FEND3") {
            return FEND3Image
        } else if(this.props.data.image === "FEND4") {
            return FEND4Image
        } else if(this.props.data.image === "FEND5") {
            return FEND5Image
        } else if(this.props.data.image === "FEND6") {
            return FEND6Image
        } else if(this.props.data.image === "ProfileReader") {
            return ProfileReaderImage
        } else if(this.props.data.image === "FacebookIDCard") {
            return FacebookIDCardImage
        } else if(this.props.data.image === "CProgrammer") {
            return CProgrammerImage
        }
    }

    getTitleColor() {
        if(this.props.data.titleColor) {
            return this.props.data.titleColor
        }
        return "black";
    }

    getDescriptionHTML() {
        if (this.props.data.description) {
            return (
                this.props.data.description
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
                    <a key={'small-box' + index} className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                       href={link.url} target="_blank">
                        <strong>{link.title}</strong>
                    </a>
                )
            });
        }
    }

    render() {
        return (
            <div className="mdl-cell--4-col mdl-card-padding grid-small-box">
                <div className="mdl-card mdl-shadow--4dp width100">
                    <div className="mdl-card__title mdl-card--expand" style={{backgroundImage: `url(${this.getImageLink()})`, backgroundPosition: "center", backgroundSize: "cover", height: 200}}>
                        <h2 className="mdl-card__title-text" style={{color: `${this.getTitleColor()}`}}>{this.props.data.title}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {this.getDescriptionHTML()}
                    {this.getDescriptionLinksHTML()}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        {this.getButtonsHTML()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SmallBox;
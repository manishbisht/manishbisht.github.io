import React from 'react';
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
import CodeforcesImage from '../images/codeforces-small-logo.png'
import HackerrankImage from '../images/hackerrank-small-logo.jpg'
import TopcoderImage from '../images/topcoder-small-logo.png'
import HackerearthImage from '../images/hackerearth-small-logo.jpg'
import SpojImage from '../images/spoj-small-logo.jpg'
import CodechefImage from '../images/codechef-small-logo.jpg'

const SmallBox = (props) => {
    const getImageLink = () => {
        if(props.data.image === "FlipkartProductSearch") {
            return FlipkartProductSearchImage
        } else if(props.data.image === "FileExplorer") {
            return FileExplorerImage
        } else if(props.data.image === "ContestNotify") {
            return ContestNotifyImage
        } else if(props.data.image === "ToDoList") {
            return ToDoListImage
        } else if(props.data.image === "FoodHelper") {
            return FoodHelperImage
        } else if(props.data.image === "ContentSearch") {
            return ContentSearchImage
        } else if(props.data.image === "FEND1") {
            return FEND1Image
        } else if(props.data.image === "FEND2") {
            return FEND2Image
        } else if(props.data.image === "FEND3") {
            return FEND3Image
        } else if(props.data.image === "FEND4") {
            return FEND4Image
        } else if(props.data.image === "FEND5") {
            return FEND5Image
        } else if(props.data.image === "FEND6") {
            return FEND6Image
        } else if(props.data.image === "ProfileReader") {
            return ProfileReaderImage
        } else if(props.data.image === "FacebookIDCard") {
            return FacebookIDCardImage
        } else if(props.data.image === "CProgrammer") {
            return CProgrammerImage
        } else if(props.data.image === "Codeforces") {
            return CodeforcesImage
        } else if(props.data.image === "Hackerrank") {
            return HackerrankImage
        } else if(props.data.image === "Topcoder") {
            return TopcoderImage
        } else if(props.data.image === "Hackerearth") {
            return HackerearthImage
        } else if(props.data.image === "Spoj") {
            return SpojImage
        } else if(props.data.image === "Codechef") {
            return CodechefImage
        }
    }

    const getTitleColor = () => {
        if(props.data.titleColor) {
            return props.data.titleColor
        }
        return "black";
    }

    const getDescriptionHTML = () => {
        if (props.data.description) {
            return (
                props.data.description
            )
        }
    }

    const getDescriptionLinksHTML = () => {
        if (props.data.descriptionLinks) {
            let listitems = props.data.descriptionLinks.map((item, index) => {
                return <li key={'boxItem' + index}>{item.data}</li>
            });
            return (
                <ul>
                    {listitems}
                </ul>
            )
        }
    }

    const getButtonsHTML = () => {
        if (props.data.links) {
            return props.data.links.map((link, index) => {
                return (
                    <a key={'small-box' + index}
                       className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
                       href={link.url}
                       target="_blank"
                       rel="noopener noreferrer">
                        <strong>{link.title}</strong>
                    </a>
                )
            });
        }
    }

    return (
        <div className="mdl-cell--4-col mdl-card-padding grid-small-box">
            <div className="mdl-card mdl-shadow--4dp width100">
                <div className="mdl-card__title mdl-card--expand" style={{backgroundImage: `url(${getImageLink()})`, backgroundPosition: "center", backgroundSize: "cover", height: 200}}>
                    <h2 className="mdl-card__title-text" style={{color: `${getTitleColor()}`}}>{props.data.title}</h2>
                </div>
                <div className="mdl-card__supporting-text">
                    {getDescriptionHTML()}
                    {getDescriptionLinksHTML()}
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    {getButtonsHTML()}
                </div>
            </div>
        </div>
    );
};

export default SmallBox;
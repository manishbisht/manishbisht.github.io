import React, { Component } from 'react';
import SkillsData from '../../data/skills'
import PythonImage from '../../images/python-logo.png'
import GoogleCloudImage from '../../images/googlecloud-logo.png'
import AlexaImage from '../../images/amazonalexa-logo.png'
import AWSImage from '../../images/amazonaws-logo.png'
import MDLImage from '../../images/mdl-logo.png'
import AndroidImage from '../../images/android-logo.jpg'
import AngularImage from '../../images/angular-logo.svg'
import CImage from '../../images/c-logo.png'
import CPImage from '../../images/cp-logo.png'
import PhotoshopImage from '../../images/photoshop-logo.png'
import IllustratorImage from '../../images/illustrator-logo.png'
import SQLImage from '../../images/mysql-logo.png'
import jQueryImage from '../../images/jquery-logo.png'
import BootstrapImage from '../../images/bootstrap-logo.png'
import AssistantImage from '../../images/googleassistant-logo.jpg'
import FlaskImage from '../../images/flask-logo.png'
import FirebaseImage from '../../images/firebase-logo.png'
import MATLABImage from '../../images/matlab-logo.png'
import JavaImage from '../../images/java-logo.png'
import PHPImage from '../../images/php.png'
import HTMLImage from '../../images/html-logo.png'
import CSSImage from '../../images/css-logo.png'
import JSImage from '../../images/js-logo.jpg'
import ReactImage from '../../images/react-logo.png'

class Skills extends Component {
    getSkillImage(name) {
        if(name === "Python") {
            return PythonImage
        } else if(name === "React") {
            return ReactImage
        } else if(name === "GoogleCloud") {
            return GoogleCloudImage
        } else if(name === "MATLAB") {
            return MATLABImage
        } else if(name === "AWS") {
            return AWSImage
        } else if(name === "Firebase") {
            return FirebaseImage
        } else if(name === "HTML") {
            return HTMLImage
        } else if(name === "CSS") {
            return CSSImage
        } else if(name === "JS") {
            return JSImage
        } else if(name === "Flask") {
            return FlaskImage
        } else if(name === "Android") {
            return AndroidImage
        } else if(name === "MDL") {
            return MDLImage
        } else if(name === "Angular") {
            return AngularImage
        } else if(name === "Illustrator") {
            return IllustratorImage
        } else if(name === "Photoshop") {
            return PhotoshopImage
        } else if(name === "Java") {
            return JavaImage
        } else if(name === "PHP") {
            return PHPImage
        } else if(name === "Assistant") {
            return AssistantImage
        } else if(name === "C") {
            return CImage
        } else if(name === "CP") {
            return CPImage
        } else if(name === "SQL") {
            return SQLImage
        } else if(name === "Bootstrap") {
            return BootstrapImage
        } else if(name === "jQuery") {
            return jQueryImage
        } else if(name === "Alexa") {
            return AlexaImage
        }
    }

    getSkillsData() {
        return SkillsData.map((skill, index) => {
            return (
                <div key={'skill' + index} className="mdl-cell mdl-cell--6-col">
                    <h3><strong>{skill.title}</strong></h3>
                    <img src={this.getSkillImage(skill.image)} align="right" alt={skill.title} />
                    <div id={skill.image} className="mdl-progress mdl-js-progress"></div>
                </div>
            );
        })
        /*.sort(function(a, b){
            return b.value - a.value
            })*/
    }

    componentDidMount() {
        for(let index in SkillsData) {
            document.getElementById(SkillsData[index].image).addEventListener('mdl-componentupgraded', function () {
                this.MaterialProgress.setProgress(SkillsData[index].value);
            });
        }
    }

    render() {
        return (
            <div>
                <h1 align="center"><strong>My Skills</strong></h1>
                <div className="mdl-grid grid">
                    {this.getSkillsData()}
                </div>
            </div>
        );
    }
}

export default Skills;
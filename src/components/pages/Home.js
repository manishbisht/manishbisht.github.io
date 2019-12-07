import React, { Component } from 'react';
import ProfileData from './../../data/personal-details'
import NameSound from './../../audio/Manish_Bisht.mp3'
import ProfilePicture from './../../images/manish.jpg'

class Home extends Component {
    playSound() {
        this.sound.play();
    }

    render() {
        return (
            <div className="view" align="center">
                <img src={ProfilePicture} className="mainimage" alt="profile" /><br />
                    <h2>Hi, I am {ProfileData.name}
                        <audio ref={(sound) => { this.sound = sound; }} src={NameSound} preload="auto" />
                        <input
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAQAAAC1QeVaAAAAi0lEQVQokWNgQAYyQFzGsIJBnwED8DNcBpK+DM8YfjMUokqxMRxg+A9m8TJsBLLSEFKMDCuBAv/hCncxfGWQhUn2gaVAktkMXkBSHmh0OwNU8D9csoHhO4MikN7BcAGb5H+GYiDdCTQYq2QubkkkY/E6CLtXdiJ7BTMQMnAHXxFm6IICvhwY8AYQLgCw2U9d90B8BAAAAABJRU5ErkJggg=="
                            height="14" type="image" width="14" onClick={() => this.playSound()} alt="name-sound" />
                    </h2>
                    <div>
                        <div className="material-icons location-icon">place</div>
                        <h3> Mumbai, Maharashtra (India)</h3>
                    </div>
                    <div>
                        <h4><strong>
                            <i className="material-icons">work</i> {ProfileData.jobTitle} at {ProfileData.worksFor}
                        </strong>
                        </h4>
                    </div>
            </div>
        );
    }
}

export default Home;
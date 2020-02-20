import React from 'react';
import ProfileData from './../../data/personal-details'

const Header = () => (
    <header className="mdl-layout__header">
        <div className="mdl-layout__drawer-button">
            <i className="material-icons">menu</i>
        </div>
        <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">
                        {ProfileData.name}
                    </span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation mdl-layout--large-screen-only">
                <i className="material-icons header-icon">contact mail</i>
                <span className="email">&nbsp;{ProfileData.email}</span>
                <i className="material-icons header-icon">call</i>
                <span className="mobile-number">&nbsp;{ProfileData.telephone}</span>
            </nav>
        </div>
    </header>
);

export default Header;
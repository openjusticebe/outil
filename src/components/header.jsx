// JS
import {Link, Trans, useI18next, I18nextContext} from 'gatsby-plugin-react-i18next';
import {Link as GatsbyLink} from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import UserMenu from "../components/header_profile";
// CSS
import '../styles/header.scss';
// IMG
import OJLogo from "../images/openjustice_tq.png";
import OutilLogo from "../images/Outil_black.png";

const Header = ({isAdmin, siteTitle}) => {
    const {languages, originalPath, t} = useI18next();
    const context = React.useContext(I18nextContext);

    return (
        <header className="main-header">
            <nav className="sub-header-main">
                <Link to="/" className="home">
                    <img className="i1" src={ OutilLogo } alt={ siteTitle }/>
                    <img className="i2 d-none d-lg-inline" src={ OJLogo } alt={ siteTitle }/>
                </Link>
                <ul className="navigation" >
                  <li className="nav-item mx-3"><GatsbyLink className="nav-link" to="https://openjustice.be"><Trans>Information</Trans></GatsbyLink></li>
                  <li className="nav-item mx-3"><GatsbyLink className="nav-link" to="http://openjustice.be/wp-content/uploads/2020/11/pilot1.pdf"><Trans>Guide</Trans></GatsbyLink></li>
                  <li className="nav-item mx-3"><a className="nav-link" href="mailto:team@openjustice.be"><Trans>Contact</Trans></a></li>
                </ul>
            </nav>
            <nav className="sub-header-sec">
                <UserMenu isAdmin={isAdmin} />
                <ul className="languages ml-auto">
                    { languages.map((lng) => (
                        <li key={ lng }>
                            <Link to={ originalPath } language={ lng } className={ lng == context.language && "selected"  }>{ lng }</Link>
                        </li>
                    )) }
                </ul>
            </nav>
        </header>
    );
};

Header.propTypes = {
  siteTitle: PropTypes.string
};

Header.defaultProps = {
  siteTitle: ``
};

export default Header;

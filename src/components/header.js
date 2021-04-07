import {Link, useI18next, I18nextContext} from 'gatsby-plugin-react-i18next';
import PropTypes from 'prop-types';
import '../styles/header.scss';
import React from 'react';
import OJLogo from "../images/openjustice_tq.png"

const Header = ({siteTitle}) => {
    const {languages, originalPath, t} = useI18next();
    const context = React.useContext(I18nextContext);

    return (
        <header className="main-header">
            <nav className="navbar navbar-expand-lg">
            <Link to="/">
                <img src={ OJLogo } style={{ "width": 190, "height": 'auto' }} alt={ siteTitle }/>
            </Link>
                <ul className="navbar-nav languages ml-auto">
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

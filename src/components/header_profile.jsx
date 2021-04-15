import React from "react"
import { navigate } from "gatsby"
import { getUser, isLoggedIn, logout, logcheck } from "../services/auth"
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const UserMenu = ({ isAdmin }) => {
    const usr = getUser();

    return (
    <>
        <ul className="userOptions">
              { isLoggedIn() ? (
                  <>
                  { 
                      // <li className="nav-item"> { usr['username'] } </li> --> 
                  }

                  { usr.admin && isAdmin && 
                        <li className="nav-item mx-2">
                            <Link to="/" className="nav-link btn btn-outline-dark">Outil</Link>
                        </li>}
                  { usr.admin && ! isAdmin && 
                        <li className="nav-item mx-2">
                            <Link to="/admin" className="nav-link btn btn-outline-dark">Admin</Link>
                        </li> }
                  <li className="nav-item mx-2"><a href="/" className="nav-link btn btn-dark" onClick={event => {
                        event.preventDefault()
                        logout(() => navigate(`/`))
                      }}><Trans>Déconnexion</Trans></a></li>
                  </>
              ) : (
                  <>
                  <li className="nav-item mx-2">
                      <Link to="/subscribe" className="nav-link btn btn-outline-ojsec px-4"><Trans>Inscription</Trans></Link>
                  </li>
                  <li className="nav-item mx-2">
                      <Link to="/login" className="nav-link btn btn-ojsec px-4"><Trans>Connexion</Trans></Link>
                  </li>
                  </>
            )}
        </ul>
    </>);
}

export default UserMenu

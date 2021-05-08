// JS
import React, { useEffect, useState } from "react";
import { Router } from "@reach/router"
import { graphql } from 'gatsby';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { getUser, isLoggedIn, logout, logcheck } from "../services/auth"
// COMPS
import Layout from "../components/layout";
import SEO from '../components/seo';
import PrivateRoute from "../components/private_route"
import DocList from "../components/admin/doclist"
import Edit from "../components/admin/edit"
// CSS
import '../styles/admin.scss';
import '../styles/components.scss';
// IMG

const UserProfile = () =>  {
    const usr = getUser();
    return (
    <div className="container m-3">
        <div className="container">
            <h2>Utilisateur connecté</h2>
                <dl className="row border mt-3">
                    <dt className="col-3"> Utilisateur </dt>
                    <dd className="col-9"> { usr['username'] } </dd>
                    <dt className="col-3"> E-mail </dt>
                    <dd className="col-9"> { usr['email'] } </dd>
                </dl>
        </div>
        <div className="container pt-3">
            <h2>Documentation et aides</h2>
            <ul className="list-group">
                <li><a rel="noreferrer" href="https://pad.openjustice.be/s/Y05nO9Ifq#" target="_blank">Documentation administration & modération</a></li>
                <li><a rel="noreferrer" href="https://docs.google.com/document/d/1AHMyNr3Pu-4q4cLn4ZDxsL-GJi_hJWmcUdVBnMoVme0/edit?usp=sharing" target="_blank">Document google notes webinaire</a></li>
            </ul>
        </div>
    </div>
    );
}

const AdminPage = () => {
    const {t} = useTranslation();
    const {navigate} = useI18next();

    useEffect(() => {
        // 
        if (!isLoggedIn()) {
            navigate('/');
        }
    }, []);
    
    return (
        <Layout isAdmin={true}>
            <SEO title={t('Admin')} />
            <div className="tab_links nav nav-tabs">
                <Link className="nav-link" activeClassName="active" to="/admin"><Trans>Profil</Trans></Link>
                <Link className="nav-link" activeClassName="active" to="/admin/review"><Trans>Nouveaux</Trans></Link>
                <Link className="nav-link" activeClassName="active" to="/admin/waiting"><Trans>En Attente</Trans></Link>
                <Link className="nav-link" activeClassName="active" to="/admin/published"><Trans>Publiés</Trans></Link>
                <Link className="nav-link" activeClassName="active" to="/admin/flagged"><Trans>Signalés</Trans></Link>
                <Link className="nav-link" activeClassName="active" to="/admin/deleted"><Trans>Corbeille</Trans></Link>
            </div>
            <div className="tab_content">
                <Router>
                    { isLoggedIn() && (
                        <>
                        <UserProfile path="/admin" />
                        <PrivateRoute path="/admin/review" component={DocList} collection='review' />
                        <PrivateRoute path="/admin/waiting" component={DocList} collection='waiting' />
                        <PrivateRoute path="/admin/published" component={DocList} collection='published' />
                        <PrivateRoute path="/admin/flagged" component={DocList} collection='flagged' />
                        <PrivateRoute path="/admin/deleted" component={DocList}  collection='deleted' />
                        <PrivateRoute path="/admin/edit/:docid" component={Edit} />
                        </>
                    )}
                </Router>
            </div>
        </Layout>
    );
}

export default AdminPage;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

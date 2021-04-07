import React, { useState } from "react";
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import SEO from '../components/seo';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { handleLogin, isLoggedIn } from "../services/auth"
import LoadGif from '../images/hourglass.gif';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row } from 'react-bootstrap';

const IndexPage = () => {
    const {t} = useTranslation();
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState(false);
    const [fData, setFData] = useState({'login': null, 'password': null});


    const handleUpdate = event => {
        let newFData = {...fData};
        newFData[event.target.name] = event.target.value;
        setError(false);
        setFData(newFData);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setWaiting(true);
        handleLogin(
            fData,
            () => {navigate(`/`)},
            () => {handleError()}
        );
    };


    const handleError = () => {
        setError(true);
        setWaiting(false);
    };


    if (isLoggedIn()) {
        navigate(`/admin`);
    };

    return (
        <Layout>
            <div className="container m-3 d-flex justify-content-center">
                <div className="col-6 mt-5">
                    <h2 className="display-5 text-secondary"><Trans>Connexion utilisateur</Trans></h2>
                    <Form
                      method="post"
                      onSubmit={event => { handleSubmit(event) }}
                    >
                        <Row>
                            <Form.Label>
                                <Trans>Email</Trans>
                              <Form.Control name="username" type="text" onChange={ handleUpdate } />
                            </Form.Label>
                        </Row>
                        <Row>
                            <Form.Label>
                              <Trans>Mot de passe</Trans>
                              <Form.Control name="password" type="password" onChange={ handleUpdate } />
                            </Form.Label>
                        </Row>
                        <Row>
                            { error && <div className="bg-warning text-dark p-3"> Erreur de connexion </div> }
                        </Row>
                        <Row>
                            <a href="#" className=""><small><Trans>Mot de passe oublié</Trans></small></a>
                        </Row>
                        <Row>
                            <div className="row d-flex justify-content-center mt-4">
                                <Button variant="success" type="submit" className="p-2">
                                    <i className="icon-user pr-2" />
                                    <Trans>Se connecter</Trans>
                                    {waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </div>
        </Layout>
        );
}

export default IndexPage;

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

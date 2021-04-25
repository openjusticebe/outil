import React, { useState } from "react";
import { graphql } from 'gatsby';
import { Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

import { handleLogin, isLoggedIn } from "../../services/auth"
import {useNotification} from '../contexts/notification'
//COMP
import Layout from "../layout";
import SEO from '../seo';
//IMG
import LoadGif from '../../images/hourglass.gif';

const LoginForm = ({ lostPasswordClick }) => {
    const {t} = useTranslation();
    const { notify } = useNotification();
    const [waiting, setWaiting] = useState(false);
    const [validated, setValidated] = useState(false);
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
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setWaiting(false);
            return;
        }
        handleLogin(
            formData,
            () => {navigate(`/`)},
            () => {handleError()}
        );
    };


    const handleError = () => {
        setWaiting(false);
        notify(t('txt_error_login'), 'Error')
        //notify('poulet', 'Error');
    };


    if (isLoggedIn()) {
        navigate(`/`);
    };

    return (
        <div className="container m-3 d-flex justify-content-center">
            <div className="col-6 mt-5">
                <Form
                  noValidate
                  validated={ validated }
                  method="post"
                  onSubmit={event => { handleSubmit(event) }}
                >
                    <Row className="justify-content-center">
                            <h2 className=""><Trans>Connexion utilisateur</Trans></h2>
                            <Form.Label>
                                <Trans>Email</Trans>
                              <Form.Control name="username" required type="text" onChange={ handleUpdate } />
                            </Form.Label>
                    </Row>
                    <Row className="justify-content-center">
                            <Form.Label>
                              <Trans>Mot de passe</Trans>
                              <Form.Control name="password" required type="password" onChange={ handleUpdate } />
                            </Form.Label>
                    </Row>
                    <Row className="justify-content-center">
                        <a href="#" className="" onClick={ lostPasswordClick }><small><Trans>Mot de passe oublié</Trans></small></a>
                    </Row>
                    <Row className="row d-flex justify-content-center mt-4">
                        <Button variant="success" type="submit" className="p-2 btn-ojact">
                            <i className="icon-user pr-2" />
                            <Trans>Se Connecter</Trans>
                            {waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                        </Button>
                    </Row>
                </Form>
            </div>
        </div>
        );
}

export default LoginForm;

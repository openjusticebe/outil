import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

import { handleLostPassword } from "../../services/auth"
import {useNotification} from '../contexts/notification'
//COMP
//IMG
import LoadGif from '../../images/hourglass.gif';


const LostPasswordForm = ({ loginClick }) => {
    const {t} = useTranslation();
    const { notify } = useNotification();

    const [formData, setFormData] = useState({'email': null});
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [showText, setShowText] = useState(false);


    const handleUpdate = event => {
        let fdata = formData;
        fdata[event.target.name] = event.target.value;
        setError(false);
        setFormData(fdata);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setWaiting(false);
            return;
        }
        setWaiting(true);
        handleLostPassword(
            formData,
            () => {
                notify(t('txt_password_sent'), 'info');
                setShowText(true);
            },
            (msg=false) => {
                notify(t('txt_error_resetfailed'), 'error');
                if (msg) {
                notify(msg, 'debug');
                }
            }
        );
    };



    return (
        <div className="container m-3 d-flex justify-content-center">
            <div className="col-6 mt-5">
                <Form
                  noValidate
                  validated={ validated }
                  method="post"
                  onSubmit={event => {
                    handleSubmit(event)
                  }}
                >
                    <Row className="justify-content-center">
                        <h2 className=""><Trans>Mot de passe perdu</Trans></h2>
                        <div className="">
                            <p>{ t('txt_password_lost')}</p>
                        </div>
                    </Row>
                    <Row className="justify-content-center">
                        <Form.Label>
                            Email
                          <Form.Control name="email" type="email" required onChange={ handleUpdate }  />
                        </Form.Label>
                    </Row>
                    { showText ?
                    (<Row className="justify-content-center">
                            <div className="bg-success text-white p-3">
                                <p><Trans>Lien de réinitialisation envoyé par email.</Trans></p>
                            </div>
                    </Row>)
                    :
                    (<Row className="justify-content-center">
                        <div className="row d-flex justify-content-center mt-4">
                            <a href="#" className="mr-2 btn btn-outline-ojact" onClick={ loginClick }><Trans>Retour</Trans></a>
                            <Button variant="success" type="submit" className="p-2 btn-ojact">
                                <i className="icon-user pr-2" />
                                <Trans>Envoyer</Trans>
                                { waiting && <img className="loadgif" src={LoadGif} alt="loading" /> }
                            </Button>
                        </div>
                    </Row>)
                    }
                </Form>
            </div>
        </div>
    );
    
}

export default LostPasswordForm;

import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
//  import { Notify } from '../notification'
import { handleSubscribe } from "../../services/auth"
import {useNotification} from '../contexts/notification'
// IMG
import LoadGif from '../../images/hourglass.gif';

const EmptyForm = {
    'fname': null,
    'lname': null,
    'email': null,
    'password': null,
    'interest': null,
    'profession': null,
    'description': null,
    'agree': false
}

const SubscribeForm = () => {
    const {t} = useTranslation();
    const { notify } = useNotification();

    const [validated, setValidated] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [formData, setFormData] = useState(EmptyForm);

    const handleSubmit = async event => {
        setWaiting(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setWaiting(false);
            return;
        }
        handleSubscribe(
            formData,
            () => {
                navigate(`/?auth=subscribed`);
                // NotificationManager.info('User created', 'Info');
                notify('User created', 'Info');
            },
            (msg=false) => {handleError(msg)}
        )
    };

    const handleError = (msg) => {
        setWaiting(false);
        let errText = t('txt_error_subscribe');
        if (msg) {
            notify(`${errText} ${msg}`, 'error');
        } else {
            notify(`${errText}`, 'error');
        }
    };

    const handleChange = async event => {
        const name = event.target.id;
        let fdata = formData;
        // FIXME: detect any checkbox or radio instead
        if (name === 'agree') {
            fdata['agree'] = event.target.checked;
        } else {
            fdata[name] = event.target.value;
        }
        setFormData(fdata);
    };

    return (
        <div>
            <Form noValidate
                id="subscribe"
                className="pl-3 ojform"
                validated={ validated }
                onSubmit={ handleSubmit }
                onChange={ handleChange }
                >
                    <Form.Row>
                        <h2><Trans>Inscription</Trans></h2>
                        <div className="p-4"><p>{ t('txt_subscribe_main')}</p></div>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="fname">
                            <Form.Label><Trans>Prénom</Trans></Form.Label>
                            <Form.Control required placeholder="Sacha" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lname">
                            <Form.Label><Trans>Nom de famille</Trans></Form.Label>
                            <Form.Control required placeholder="Jacobs" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="s.jacobs@example.com" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="password">
                            <Form.Label><Trans>Mot de passe</Trans></Form.Label>
                            <Form.Control required type="password" placeholder="" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} controlId="interest">
                            <Form.Label><Trans>Intérêt pour OpenJustice</Trans></Form.Label>
                            <Form.Control as="select">
                                <option value="">{ t('opt-choix') }</option>
                                <option value="test">{ t('opt-test') }</option>
                                <option value="share">{ t('opt-share') }</option>
                                <option value="participate">{ t('opt-participate') }</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="profession">
                            <Form.Label><Trans>Activité professionnelle</Trans></Form.Label>
                            <Form.Control required as="select">
                                <option value="">{ t('opt-choix') }</option>
                                <option value="avocat">{ t('opt-avocat') }</option>
                                <option value="magistrat">{ t('opt-magistrat') }</option>
                                <option value="juriste">{ t('opt-Juriste') }</option>
                                <option value="documentaliste">{t('opt-documentaliste') }</option>
                                <option value="traducteur">{ t('opt-traducteur') }</option>
                                <option value="académicien">{ t('opt-académicien') }</option>
                                <option value="chercheur">{ t('opt-chercheur') }</option>
                                <option value="etudiant">{ t('opt-etudiant') }</option>
                                <option value="developpeur">{ t('opt-developpeur') }</option>
                                <option value="autre">{ t('opt-autre') }</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="description">
                        <Form.Label><Trans>Un mot sur vous</Trans></Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Group controlId="agree">
                        <Form.Check required type="checkbox" label={ t('txt_subscribe_accept') }/>
                    </Form.Group>

                <Button variant="primary" type="submit" className="btn-ojact">
                    <Trans>Transmettre l'inscription</Trans>
                    {waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                </Button>
            </Form>
        </div>
    );
}

export default SubscribeForm;

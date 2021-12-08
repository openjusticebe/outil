//JS
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PlaceholderManager from "../services/placeholder.js";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
// IMG
import OJBin from "../images/bin.svg";
import OJEye from "../images/eye.svg";

const EntityRow = ({id, words, type, placeholder, onRemove, onChange}) => (
    <Form id={ id } className="ojform pseudoform mt-3 mb-2" data-entity={ placeholder }>
        <div className="row">
            <div className="col-8 col-xl-12 mb-2" >
                <Form.Control
                    type="text"
                    name="text"
                    placeholder="S. Dupont ; Sam D. ; Mr Dupont"
                    value={ words }
                    onChange={ onChange } />
            </div>
            {/*
            <div className="col-3 col-lg-12 mb-2">
                <Form.Control as="select" name="type" value={ type } onChange={ onChange }>
                    { PlaceholderManager.types().map( option => (
                        <option key={ option }>{ option }</option>
                    )) }
                </Form.Control>
            </div>
            */}
            <div className="col-3 col-xl-9">
                <Form.Control type="text" name="placeholder" value={ placeholder } onChange={ onChange }/>
            </div>
            <div className="col-1 col-xl-3">
                <button onClick={ onRemove } className="btn term_remove">
                    <img src={ OJBin } alt={ useTranslation('delete') } />
                </button>
            </div>
        </div>
    </Form>
);

const reactStringReplace = require('react-string-replace')


const EntityForm = ({entities, onRemove, onChange}) => (
        <div className="container overflow-auto anonOpts">
            { Object.keys(entities).map( id => {
                return (
                    <EntityRow
                        key={ id }
                        id={ id }
                        words={ entities[id]['text'] }
                        type={ entities[id]['type'] }
                        placeholder={ entities[id]['placeholder'] } 
                        onRemove={ onRemove }
                        onChange={ onChange }
                        />
                );}
            )}
        </div>
);

const EntitySpan = (match, i, clickCallback) => {
    const placeholder = match.substring(1, match.indexOf(']')).trim();
    return (
        <span id={ placeholder + '-' + i} className="anon" data-entity={ placeholder } onClick={ clickCallback }>{ match }</span>
    )
};

const prep_text = (text) => {
    let prep_text = text.replace(/(\[ ([^ \]]+) \])/g,'<span class="anon" data-entity="$2">$1</span>', text);
    return prep_text;
}


const AnonymiseUi = (props) => {
    const {t} = useTranslation();
    return (
        <div className="anonymise col-12 mb-5">
            <div className="part-heading row">
                <div className="mr-4">
                    <span className="page-current">2</span>
                    <span className="page-total">/3</span>
                </div>
                <div>
                    <h2><Trans>Vérifier l'anonymisation</Trans></h2>
                    <p><Trans>Liens vers la documentation :</Trans></p>
                    <ul>
                        <li><a className="ml-4" rel="noreferrer" href="https://pad.openjustice.be/s/kwZheAXhI#Quelles-sont-les-donn%C3%A9%C3%A9s-%C3%A0-occulter-" target="_blank">Quelles sont les donnéés à occulter ?</a></li>
                        <li><a className="ml-4" rel="noreferrer" href="https://pad.openjustice.be/s/wQQ_aoyUQ#Welke-gegevens-moeten-worden-verborgen-" target="_blank">Welke gegevens moeten worden verborgen ?</a></li>
                    </ul>
                </div>
            </div>
            <div className="row justify-content-center pt-5">
                <h3>
                    <img className="oj_eye" src={ OJEye } aria-hidden="true" />
                    <Trans>Aperçu du document final</Trans>
                </h3>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 order-xl-last col-xl-3 mb-3">
                    <div className="oj-info text-white p-2">
                        <Trans>Pseudonymisation</Trans>
                    </div>
                    <div className="oj-help p-2">
                        {t('txt_help_pseudo')}
                    </div>
                    <EntityForm
                        entities={ props.entities }
                        onRemove={ props.entityRemove }
                        onChange={ props.entityChange }/>
                    <Button
                        className="btn btn-ojact mt-3 col-5 col-xl-10 mx-3"
                        onClick={ props.entityAdd } >
                        <Trans>Ajouter un terme</Trans>
                    </Button>
                    <Button
                        className="btn btn-outline-ojact mt-3 col-5 col-xl-10 mx-3"
                        onClick={ props.entityClean } >
                        <Trans>Vider la liste</Trans>
                    </Button>
                </div>
                <div className="col-12 orger-xl-first col-xl-9">
                    <div className="oj-info text-white p-2">
                        {t('txt_legend_pseudo')}
                    </div>
        {/*
                    <div id="content_anon" dangerouslySetInnerHTML={{__html: prep_text(props.preparedText) }} >
                    </div>
        */}

                    <div id="content_anon">
                        {
                            reactStringReplace(props.preparedText, /(\[ [^ \]]+ \])/g, (match, i) => (
                                EntitySpan(match, i, props.entitySelect)
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnonymiseUi

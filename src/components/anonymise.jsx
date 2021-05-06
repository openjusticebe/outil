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
    <Form id={ id }>
        <div className="row">
            <div className="col-4" >
                <Form.Control type="text" name="text" value={ words } onChange={ onChange } />
            </div>
            <div className="col-2">
                <Form.Control as="select" name="type" value={ type } onChange={ onChange }>
                    { PlaceholderManager.types().map( option => (
                        <option key={ option }>{ option }</option>
                    )) }
                </Form.Control>
            </div>
            <div className="col-4">
                <Form.Control type="text" name="placeholder" value={ placeholder } onChange={ onChange }/>
            </div>
            <div className="col-2">
                <button onClick={ onRemove } className="btn term_remove">
                    <img className="" src={ OJBin } alt={ useTranslation('delete') } />
                </button>
            </div>
        </div>
    </Form>
);


const EntityForm = ({entities, onRemove, onChange}) => (
        <div className="container anonOpts">
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

const prep_text = (text) => {
    let prep_text = text.replace(/(\[ [^ \]]+ \])/g,'<span class="anon">$1</span>', text);
    return prep_text;
}


const AnonymiseUi = (props) => {
    return (
        <div className="anonymise col-12 mb-5">
            <div className="part-heading row">
                <div className="mr-4">
                    <span class="page-current">2</span>
                    <span class="page-total">/3</span>
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
            <div className="row justify-content-center mb-2">
                <EntityForm
                    entities={ props.entities }
                    onRemove={ props.entityRemove }
                    onChange={ props.entityChange }/>
                <Button className="btn btn-ojact" onClick={ props.entityAdd } ><Trans>Ajouter un terme</Trans></Button>
            </div>
            <div className="row justify-content-center pt-5">
                <h3>
                    <img className="oj_eye" src={ OJEye } aria-hidden="true" />
                    <Trans>Aperçu du document final</Trans>
                </h3>
                <div className="oj-info text-white px-2 mx-3 mb-3">
                    Le texte anonymisé apparaît entre crochets : ceci facilite les traitements ultérieurs.<br />
                    De geanonimiseerde tekst wordt tussen vierkante haken weergegeven: dit vergemakkelijkt de latere verwerking.
                </div>
            </div>
            <div className="row justify-content-center">
                <div id="content_anon" dangerouslySetInnerHTML={{__html: prep_text(props.preparedText) }} />
            </div>
        </div>
    );
}

export default AnonymiseUi

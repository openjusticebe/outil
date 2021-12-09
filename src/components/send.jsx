// JS
import React from "react";
import { navigate } from "gatsby";
import DocLinks from "./doclink";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {YEARS, COURTS} from '../services/data';
import { isLoggedIn, getAuthHeader } from "../services/auth"
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
// IMG
import LoadGif from '../images/hourglass.gif';
import OJKey from "../assets/svg/key.svg";
import OJClip from "../assets/svg/paperclip.svg";

class SendUi extends React.Component {

    constructor(props) {
        super(props);
        this.docBlank = {kind:'eli', link:'', label:''};
        this.state = {
            country : 'BE',
            court: 'RSCE',
            year: 2021,
            identifier: '',
            text: '',
            lang: 'NL',
            appeal: 'nodata',
            userkey: '',
            waiting: false,
            error:false,
            labels:[],
            labelSuggestions: [],
            docLinks: [],
            validated: false,
            // docLinks: [{...this.docBlank}],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.labelsKeyDown = this.labelsKeyDown.bind(this);
        this.labelRemove = this.labelRemove.bind(this);
        this.labelSelect = this.labelSelect.bind(this);
        this.docAdd = this.docAdd.bind(this);
        this.docDel = this.docDel.bind(this);
        this.labelInput = '';
        this.labelController = false;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            text : props.uploadedText
        };
    }

    componentDidMount() {
        this.labelController = new AbortController();
    }

    handleChange(event) {
        let change = {}
        const name = event.target.name;
        const cname = event.target.className.split(' ')[0]; 
        if (name === 'identifier') {
            change[name] = event.target.value + '.OJ';
        } else if ( ['kind', 'link', 'label'].includes(cname) ) {
            let docLinks = [...this.state.docLinks];
            docLinks[event.target.dataset.id][cname] = event.target.value;
            change['docLinks'] = docLinks;
        } else {
            change[name] = event.target.value;
        }

        this.setState(change);
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({ validated: true });
            return;
        }

        this.setState({ waiting: true, validated: true });
        event.preventDefault();

        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
            'country' : this.state.country,
            'court' : this.state.court,
            'year' : this.state.year,
            'identifier' : this.state.identifier,
            'text' : this.state.text,
            'lang' : this.state.lang,
            'labels' : this.state.labels,
            'appeal' : this.state.appeal, 
            'user_key' : this.state.userkey,
            'doc_links' : this.state.docLinks,
        }
        const headers_obj =  {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }

        if (isLoggedIn()) {
            headers_obj["Authorization"] = getAuthHeader()
        }

        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_DATA_API}/create`, {
            method: 'POST',
            headers: headers_obj,
            body: JSON.stringify(query),
            }).then(response => response.json())
           .then(resultData => {
                this.setState({waiting: false})
                if (resultData.result === 'ok')
                    navigate(`/success?hash=${resultData.hash}`)
                else if (resultData.detail)
                    this.setState({error:{__html: resultData.detail}});
                else
                    this.setState({error:{__html: resultData}});
            }).catch(error => {
                const msg = `Erreur de serveur, Server fout: ${error.toString()}`;
                this.setState({waiting: false, error:{__html: msg}});
            });
    }

    labelsKeyDown(event) {
        // Abort running query, if any

        if (this.labelController !== false)
            this.labelController.abort();
        this.labelController = new AbortController();
        const val = event.target.value;
        if ((event.key === 'Enter' || event.key === ' ') && val) {
          event.preventDefault();
          if (this.state.labels.find(label => label.toLowerCase() === val.toLowerCase())) {
            return;
          }
          const newlabels = [ ...this.state.labels, val]
          this.setState({ labels:  newlabels });
          this.labelInput.value = null;
        } else if (event.key === 'Backspace' && !val) {
          this.labelRemove(this.state.labels.length - 1);
        }

        const { signal } = this.labelController;
        const str = val + event.key;

        //FIXME: Suboptimal, check websockets or another protocol
        fetch(`${process.env.GATSBY_DATA_API}/labels/${str}`, {
            method: 'get',
            signal: signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(labelList => {
                if (Array.isArray(labelList)) {
                    this.setState({ labelSuggestions : labelList });
                } else {
                    console.log('Failed recovering suggestions : ', labelList);
                }
            })
            .catch(error => console.log(error) );
    }

    labelRemove(index) {
        const newlabels = [ ...this.state.labels ];
        newlabels.splice(index, 1);

        // Call the defined function setlabels which will replace labels with the new value.
        this.setState({ labels: newlabels });
    }

    labelSelect(event) {
        const val = event.target.innerText;

        if (this.state.labels.find(label => label.toLowerCase() === val.toLowerCase())) {
            this.setState({ labelSuggestions: [] });
        } else {
            const newlabels = [ ...this.state.labels, val]
            this.setState({ labels:  newlabels, labelSuggestions: [] });
        }

        this.labelInput.value = null;
    }

    docAdd() {
        this.setState({ docLinks: [...this.state.docLinks, {...this.docBlank}]});
    }

    docDel(index) {
        const newDocs = [ ...this.state.docLinks ];
        newDocs.splice(index, 1);
        this.setState({ docLinks: newDocs });
    }

    render() {
        return (
            <div className="col-12 mb-5">
                <div className="part-heading row">
                    <div className="mr-4">
                        <span className="page-current">3</span>
                        <span className="page-total">/3</span>
                    </div>
                    <div>
                        <h2><Trans>Définir les données et envoyer</Trans></h2>
                    </div>
                </div>
                <div className="row px-4 mt-4">
                    <Form
                        id="send"
                        noValidate
                        validated={ this.state.validated }
                        onSubmit={ this.handleSubmit }
                        onChange={ this.handleChange }
                        className="ojform col-12">

                        <fieldset className="p-3">
                            <legend>
                                <OJKey aria-hidden="true" />&nbsp;
                                <Trans>Propriétés du document</Trans>
                            </legend>
                            <Row>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.country">
                                        <Form.Label><Trans>Pays</Trans></Form.Label>
                                        <Form.Control name="country" as="select">
                                          <option>BE</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.lang">
                                        <Form.Label><Trans>Langue</Trans></Form.Label>
                                        <Form.Control name="lang" as="select">
                                          <option value="NL">NL</option>
                                          <option value="FR">FR</option>
                                          <option value="DE">DE</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.year">
                                        <Form.Label><Trans>Année</Trans></Form.Label>
                                        <Form.Control name="year" as="select">
                                          { YEARS.map( year => (<option key={ year }>{ year }</option>) ) }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="myform.court">
                                <Form.Label><Trans>Source</Trans></Form.Label>
                                <Form.Control name="court" as="select">
                                  { COURTS.map( (group, i) => (
                                      <optgroup key={ i } label={ group.label_fr + " / " + group.label_nl }>
                                          { group.list.map((court, j) =>
                                              <option key={ j } value={ court.id }>
                                              {/* { useTranslation(`txt_${court.id}`) } */ }
                                              { court.id } / {court.name_fr} - {court.name_nl}
                                              </option>)
                                          }
                                      </optgroup>
                                  ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="myform.appeal">
                                <Form.Label><Trans>Appel interjeté</Trans></Form.Label> 
                                <Form.Control name="appeal" as="select">
                                  <option value="nodata" default="yes">Pas d'information / Geen informatie</option>
                                  <option value="yes">Oui / Ja</option>
                                  <option value="no">Non / Nee</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="myform.labels">
                                <Form.Label><Trans>Labels</Trans> (<Trans>catégories</Trans>)</Form.Label>
                                <div className="text-muted mb-1">COVID-19, anatocisme, ...</div>
                                <ul className="labels-list">
                                  { this.state.labels.map((label, i) => (
                                      <li key={i} className="bg-dark text-white">
                                          #{label}
                                          <button type="button" onClick={ () => { this.labelRemove(i);} }>+</button>
                                      </li>
                                  ))}
                                  <li className="labels-input">
                                      <input type="text" onKeyDown={ this.labelsKeyDown } ref={c => { this.labelInput = c; }} />
                                      { this.state.labelSuggestions.length > 0 &&
                                      <ul className="sublabels">
                                          { this.state.labelSuggestions.map((label, i) => (
                                              <li key={i} className="bg-light" onClick={ this.labelSelect }>
                                                  {label}
                                              </li>
                                          ))}
                                      </ul>
                                      }
                                  </li>
                                </ul>
                            </Form.Group>

                        </fieldset>

                        <fieldset className="p-3 mt-4 mb-4">
                            <legend>
                                <OJClip aria-hidden="true" />&nbsp;
                                <Trans>Liens et références vers d'autres textes</Trans>
                            </legend>
                            <Form.Group controlId="myform.docs">
                                <Form.Label></Form.Label>
                                <ul className="doclinks list-group">
                                    <DocLinks
                                        docs={ this.state.docLinks }
                                        docDel={ this.docDel }
                                        docChange={ this.handleChange }
                                    />
                                </ul>
                                <div className="d-flex justify-content-center">
                                    <button
                                        type="button"
                                        onClick={ () => this.docAdd() }
                                        className="btn btn-ojact" >
                                        <Trans>Ajouter</Trans>
                                    </button>
                                </div>
                            </Form.Group>
                        </fieldset>

                        { isLoggedIn() ? null : ( 
                        <fieldset className="p-3 mt-4 mb-4">
                            <legend>
                                <i className="icon-cog pr-2" />
                                <Trans>Données de téléchargement</Trans>
                            </legend>
                            {/*
                            <Form.Group controlId="myform.identifier">
                              <Form.Label>Identifiant du document / Document Identificatie nummer</Form.Label>
                              <div className="text-muted mb-1">
                                  ARR.20200912 , ... <br />
                                  (sera révisé lors de la validation / zal worden herzien tijdens validatie)
                              </div>
                              <Form.Control type="text" name="identifier" placeholder="ARR.XXXXXX" />
                            </Form.Group>

                            <Form.Label>Aperçu ECLI / ECLI voorbeeld</Form.Label>
                            <pre>
                              ECLI:{this.state.country}:{this.state.court}:{this.state.year}:{this.state.identifier}
                            </pre>
                            */}

                            <Form.Group controlId="myform.userkey">
                                <Form.Label>
                                    <i className="icon-key pr-2" />
                                    <Trans>Clé Utilisateur</Trans>
                                </Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="userkey"
                                        placeholder="XXXXX"
                                    />
                                <Form.Control.Feedback type="invalid">
                                    <Trans>Veuillez saisir votre clé personnelle</Trans>
                                </Form.Control.Feedback>
                            </Form.Group>
                        </fieldset>
                        )}
                        { !this.state.error &&
                        <p><Trans>La dernière étape</Trans> !</p>
                        }

                        { this.state.error &&
                            <div className="log col-10" dangerouslySetInnerHTML={ this.state.error } />
                        }
                        <div className="row justify-content-center mt-4">
                        <div>
                            <Button type="submit" className="btn btn-ojact p-3">
                            {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                            <i className="icon-paper-plane pr-2" />
                            <Trans>envoyer</Trans>
                            </Button>
                        </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default SendUi


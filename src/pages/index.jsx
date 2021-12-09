// JS
import React, { useEffect, useState } from "react";
import { graphql } from 'gatsby';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';
import { useQueryParam, StringParam } from "use-query-params";
import { getUser, isLoggedIn, logout, logcheck } from "../services/auth"
import parseText from "../services/parser.js";
import PlaceholderManager from "../services/placeholder.js";
import {NotifElement} from '../components/notification'
// COMPS
import Layout from "../components/layout";
import SEO from '../components/seo';
import UploadUi from "../components/upload";
import AnonymiseUi from "../components/anonymise";
import SendUi from "../components/send";
// CSS
import '../styles/index.scss';
import '../styles/components.scss';
// IMG
import OJCheck from "../images/check.svg";
import OJSubscribe from "../images/inscription.svg";
import OJUpload from "../images/upload.svg";
import OJDown from "../images/arrow_down.svg";

const IndexPage = () => {
    const {t} = useTranslation();
    const {navigate} = useI18next()
    const [auth, setAuth] = useQueryParam("auth", StringParam);
    const [msg, setMsg] = useState('');

    const [rawText, setRawText] = useState('...');
    const [parsedText, setParsedText] = useState('...');
    const [entities, setEntities] = useState({});

    useEffect(() => {
        switch(auth) {
            case 'reset':
                logout(() => navigate(`/login`));
                break;
            case 'subscribed':
                setMsg(t('msg_account_created'));
                break;
            default:
                break;
                if (isLoggedIn()) {
                    logcheck(() => navigate(`/login`));
                } else {
                    navigate(`/login`);
                }
                break;
        }
        setAuth('ok');
    }, [auth]);

    useEffect(() => {
        setParsedText(
            parseText(entities, rawText)
        );
    }, [entities]);

    /////////////////////////////////////////////////////////// Text management
    ///////////////////////////////////////////////////////////////////////////

    const handleExtract = async (text, entities_in, log={}) => {
        let _entities = {...entities_in};
        const keys = Object.keys(_entities);
        keys.forEach( key => {
            let e = _entities[key];
            _entities[key] = {
                id: e.id,
                text: e.text[0],
                type: e.type,
                words: e.words,
                placeholder: PlaceholderManager.get(e.type, key)
            };
        });


        if (text) {
            setRawText(text);
            setEntities(entities => { return {...entities, ..._entities} });
        }
        //FIXME : do proper notification
        //if ('log_text' in log) {
        //    this.setState({
        //        log_text: {__html: log['log_text'] }
        //    })
        //}
    }

    const entityRemove = async (event) => {
        let newEntities = {...entities};
        const evId = event.currentTarget.parentNode.parentNode.parentNode.id;
        if (evId in newEntities) {
            delete newEntities[evId];
        }
        setEntities(newEntities);
    }

    const entityClean = async(event) => {
        setEntities({});
    }

    const entityAdd = async (event) => {
        let len = Object.keys(entities).length + 1;
        let newkey = `entity#${len}`;
        let newEntities = {...entities};
        let userSelected = window.getSelection().toString();
        window.getSelection().empty();
        let newText = userSelected != '' ? userSelected : '';

        newEntities[newkey] = {
            'text': newText,
            'type':'person',
            'placeholder': PlaceholderManager.get('person', newkey)
        };
        setEntities(newEntities);
    }

    const entityUpdate = async (event) => {
        const id = event.currentTarget.parentNode.parentNode.parentNode.id;
        let newEntities = {...entities};
        let field = event.target.name;
        if (id in newEntities) {
            newEntities[id][field] = event.target.value;
        }
        
        setEntities(newEntities);
    }
    
    const entitySelect = async (event) => {
        if (event.target.tagName !== 'SPAN') {
            console.log('coucou');
            return;
        }

        var element = document.querySelector(".selected");
        if (element != null) {
            element.classList.remove("selected");
        }

        event.target.parentNode.classList.add('selected');
        const obj = event.target.dataset;
        const formObj = document.querySelector(`[data-entity="${obj.entity}"]`);
        formObj.scrollIntoView({ behavior: 'smooth'});
        formObj.animate ([
            {backgroundColor: '#f88'},
            {backgroundColor: 'transparent'}
        ], {
            duration: 3000,
            iterations: 1
        });
    }

    const entityModify = (entity, operation, value) => {
        const formObj = document.querySelector(`[data-entity="${entity}"]`);
        let id = formObj.id;

        let newEntities = {...entities};

        let userSelected = window.getSelection().toString();
        window.getSelection().empty();

        let newValue = userSelected != '' ? userSelected : value;

        if (id in newEntities) {
            let prevValue = newEntities[id]['text'].split('');
            switch(operation) {
                case 'unshift':
                    prevValue.unshift(newValue);
                    break;
                case 'shift' :
                    prevValue.shift();
                    break;
                case 'pop':
                    prevValue.pop();
                    break;
                case 'push':
                    prevValue.push(newValue);
                    break
                }
            newEntities[id]['text'] = prevValue.join('');
            setEntities(newEntities);
        }
    }

    return (
        <Layout>
            <SEO title={t('Home')} />
            <div className="container">
                <div className="row introtext pt-4">
                    <div className="col-sm text-center">
                        <h2>
                            <img className="svg-icon" src={ OJCheck} aria-hidden="true" />
                            <Trans>Partage d'arrêts et jugements</Trans>
                        </h2>
                        { t('txt_index_share') } 
                        <p className="mt-4">
                            <a href="http://openjustice.be"><Trans>Découvrir OpenJustice.be</Trans></a>
                        </p>
                    </div>
                    <div className="col-sm text-center">
                        <h2>
                            <img className="svg-icon" src={ OJSubscribe} aria-hidden="true" />
                            <Trans>Inscription</Trans>
                        </h2>
                        { t('txt_index_subscribe') }
                        <p className="mt-4">
                            <Link to="/subscribe"><Trans>M'inscrire au projet pilote</Trans></Link>
                        </p>
                    </div>
                    <div className="col-sm text-center">
                        <h2>
                            <img className="svg-icon" src={ OJUpload} aria-hidden="true" />
                            <Trans>Chargement</Trans>
                        </h2>
                        <p>{ t('txt_index_upload') }
                            <br /><b>{ t('txt_index_upload_bis') }</b>
                        </p>
                        <p className="mt-4">
                            <a href={ t('url_manual') }><Trans>Manuel d'utilisation</Trans></a>
                        </p>
                    </div>
                </div>
                <div className="row justify-content-md-center bridgetext">
                    <div>
                        <img className="svg-icon" src={ OJDown } aria-hidden="true" />
                        <Trans>Commencez à charger votre document</Trans>
                        <img className="svg-icon" src={ OJDown } aria-hidden="true" />
                    </div>
                </div>
                <div className="row">
                    <UploadUi 
                        TextHandler = { handleExtract }
                        hashKey={'upload'}
                        />    
                    <AnonymiseUi
                            preparedText = { parsedText }
                            entities = { entities }
                            textChange = { (event) => { setParsedText(event.target.value) } }
                            entityRemove = { entityRemove }
                            entityAdd = { entityAdd }
                            entityClean = { entityClean }
                            entityChange = { entityUpdate }
                            entitySelect = { entitySelect }
                            entityModify = { entityModify }
                            hashKey={'anonymise'} />
                    <SendUi uploadedText = { parsedText } hashKey={'send'} />
                            
                </div>
            </div>
            <NotifElement msg = { msg } />
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

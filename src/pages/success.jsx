// JS
import React  from "react";
import { graphql } from 'gatsby';
import {Link, Trans, useTranslation, useI18next} from 'gatsby-plugin-react-i18next';

// COMPS
import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import PreviewUi from "../components/preview";
//
// CSS
import '../styles/index.scss';

const SuccessPage = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <SEO title="OJ / Upload Alpha" />
            <div className="container">
                <div className="row mt-3 justify-content-center info">
                    <div className="col-5">
                        <h2><Trans>Bravo !</Trans></h2>
                        { t('txt_success') }
                    </div>
                </div>
                <div className="row justify-content-center info">
                    <div className="col-2">
                        <img src={ clapgif} alt="bravo !"/>
                    </div>
                </div>
                <div className="row mt-3 justify-content-center">
                    <PreviewUi />
                </div>
                <div className="row mt-3">
                    <Link to="/">&lt; <Trans>Retour</Trans></Link> 
                </div>
            </div>
        </Layout>
    )
}

export default SuccessPage

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

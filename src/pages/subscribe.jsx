// JS
import React  from "react";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { graphql } from 'gatsby';
import { handleLogin, isLoggedIn } from "../services/auth"
// COMPS
import Layout from "../components/layout";
import SEO from "../components/seo";
import SubscribeForm from "../components/forms/subscribe";
// IMG
// CSS
import '../styles/components.scss';

const SubscribePage = () => {
    if (isLoggedIn()) {
        navigate(`/`);
    };

    return (
        <Layout>
            <SEO title="OJ / Subscription" />
            <SubscribeForm />
        </Layout>
    )
}

export default SubscribePage

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

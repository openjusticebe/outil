import React from "react";
import { graphql } from 'gatsby';
import Layout from "../components/layout";
import SEO from '../components/seo';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const IndexPage = () => {
  const {t} = useTranslation();
  return (
    <Layout>
        <SEO title={t('Home')} />
        <div>{t('index_hello')}</div>
        <h1>Octave!</h1>
        <Trans>Comment ça va ?</Trans>
    </Layout>
    )
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

import React, { useEffect } from "react";
import { graphql, navigate } from 'gatsby';
import Layout from "../components/layout";
import SEO from '../components/seo';
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
import { getUser, isLoggedIn, logout, logcheck } from "../services/auth"
import { useQueryParam, StringParam } from "use-query-params";

const IndexPage = () => {
    const {t} = useTranslation();
    const [auth, setAuth] = useQueryParam("auth", StringParam);

    useEffect(() => {
        switch(auth) {
            case 'reset':
                logout(() => navigate(`/login`));
                break;
            default:
                if (isLoggedIn()) {
                    logcheck(() => navigate(`/login`));
                }
                break;
        }
        setAuth('ok');
    }, [auth]);

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

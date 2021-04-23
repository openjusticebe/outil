import React from "react";
import { graphql } from 'gatsby';
import { handleLogin, isLoggedIn } from "../services/auth"
//COMP
import Layout from "../components/layout";
import SEO from '../components/seo';
import LoginForm from "../components/forms/login";

import '../styles/components.scss';

const LoginPage = () => {
    return (
        <Layout>
            <LoginForm />
        <SEO title="OJ / Login" />
        </Layout>
        );
}

export default LoginPage;

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

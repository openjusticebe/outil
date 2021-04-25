import React, {useState, useEffect} from "react";
import { graphql } from 'gatsby';
import { handleLogin, isLoggedIn } from "../services/auth"
//COMP
import Layout from "../components/layout";
import SEO from '../components/seo';
import LoginForm from "../components/forms/login";
import LostPasswordForm from "../components/forms/lostPassword";

import '../styles/components.scss';

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showLost, setShowLost] = useState(false);

    const showLostPasswordForm = () => {
        console.log('lost');
        setShowLogin(false);
        setShowLost(true);
    }

    const showLoginForm = () => {
        console.log('login');
        setShowLost(false);
        setShowLogin(true);
    }


    return (
        <Layout>
        { showLogin && <LoginForm lostPasswordClick = { showLostPasswordForm }/>}
        { showLost && <LostPasswordForm loginClick = { showLoginForm }/> }
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

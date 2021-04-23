// JS
import React  from "react";
import {Link, Trans, useTranslation} from 'gatsby-plugin-react-i18next';
// COMPS
import Layout from "../components/layout";
import SEO from "../components/seo";
import SubscribeForm from "../components/forms/subscribe";
// IMG
// CSS
import '../styles/components.scss';
// import "../styles/style.scss";

class SubscribePage extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="OJ / Subscription" />
                <SubscribeForm />
            </Layout>
        )
    }
}

export default SubscribePage

import React, { useState } from "react"
import PropTypes from "prop-types"
import Header from "./header"
import { useStaticQuery, graphql } from "gatsby"
// import {NotificationContainer, NotificationManager} from 'react-notifications';

import {Link, useI18next} from 'gatsby-plugin-react-i18next';
import "../styles/main.scss"
import "../styles/reset.scss"

import { NotifProvider } from '../components/contexts/notification'
import { NotifDisplay } from '../components/notification'

export const NotificationContext = new React.createContext(false);

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `)

    const {languages, originalPath} = useI18next();
    const [notification, setNotification] = useState(false);

    return (
        <div id="body">
        <NotifProvider>
            <Header siteTitle={data.site.siteMetadata.title} />
            <NotifDisplay />
            <div
            style={{
                margin: `0 auto`,
                    maxWidth: 1140,
                    padding: `0 1.0875rem 1.45rem`,
            }}
            >
            <main>
            {children}
            </main>
            </div>
            {
                //<NotificationContainer />
                //<Footer />
            }
        </NotifProvider>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

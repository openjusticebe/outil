import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
// import {NotificationContainer, NotificationManager} from 'react-notifications';


import "../styles/main.scss"
import {Link, useI18next} from 'gatsby-plugin-react-i18next';

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

    return (
        <>
        {
            //<Header siteTitle={data.site.siteMetadata.title} />
        }
        <ul className="languages">
            {languages.map((lng) => (
                <li key={lng}>
                <Link to={originalPath} language={lng}>
                {lng}
                </Link>
                </li>
            ))}
        </ul>
        <div
        style={{
            margin: `0 auto`,
                maxWidth: 1140,
                padding: `0 1.0875rem 1.45rem`,
        }}
        >
        <main>{children}</main>
        </div>
        {
            //<NotificationContainer />
            //<Footer />
        }
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

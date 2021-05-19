let env = process.env.NODE_ENV || 'development';
const {languages, defaultLanguage} = require('./languages');

require('dotenv').config({path: `./.env.${env}`});

module.exports = {
    siteMetadata: {
        title: `OpenJustice.be // Octave // beta`,
        description: `Upload interface - beta version`,
        author: `@pieterjan_m`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
          resolve: `gatsby-plugin-manifest`,
          options: {
            name: `OpenJustice.be Outil`,
            short_name: `Outil`,
            start_url: `/`,
            background_color: `#17b5b4`,
            theme_color: `#17b5b4`,
            display: `minimal-ui`,
            icon: `src/assets/favicon/favicon-32x32.png`, // This path is relative to the root of the site.
          },
        },
        //{
        //  resolve: 'gatsby-plugin-matomo',
        //  options: {
        //    // siteId: process.env.MATOMO_SITE_ID,
        //    siteId: process.env.GATSBY_SITE_ID,
        //    matomoUrl: 'https://stats.openjustice.lltl.be',
        //    siteUrl: process.env.GATSBY_SITE_URL,
        //    // siteUrl: process.env.MATOMO_SITE_URL
        //  }
        //},
        {
            resolve: 'gatsby-plugin-react-axe',
            options: {
                showInProduction: false,

                // Options to pass to axe-core.
                // See: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
                axeOptions: {
                    // Your axe-core options.
                },
            },
        },
        //// this (optional) plugin enables Progressive Web App + Offline functionality
        //// To learn more, visit: https://gatsby.dev/offline
        //// `gatsby-plugin-offline`,
        "gatsby-plugin-use-query-params",
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                implementation: require("sass"),
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/locales`,
                //path: `${__dirname}/locales`,
                name: `locale`
            }
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                languages,
                defaultLanguage,
                // if you are using Helmet, you must include siteUrl, and make sure you add http:https
                siteUrl: `https://example.com/`,
                // you can pass any i18next options
                // pass following options to allow message content as a key
                i18nextOptions: {
                    defaultNS: 'translation',
                    lowerCaseLng: true,
                    debug: false,
                    interpolation: {
                        escapeValue: false // not needed for react as it escapes by default
                    },
                    keySeparator: false,
                    nsSeparator: false
                },
                pages: [
                    // {
                    //     matchPath: '/:lang?/blog/:uid',
                    //     getLanguageFromPath: true,
                    //     excludeLanguages: ['es']
                    // },
                    // {
                    //     matchPath: '/:lang?',
                    //     getLanguageFromPath: true,
                    // }
                ]
            }
        },
        {
          resolve: `gatsby-plugin-webfonts`,
          options: {
            fonts: {
                google: [
                    {
                      family: `Major Mono Display`,
                      formats: [ "woff", "woff2" ],
                      variants: [`400`]
                    },
                    {
                      family: `Roboto Mono`,
                      formats: [ "woff", "woff2" ],
                      variants: ['100', '400', '700']
                    },
                    {
                      family: `Roboto`,
                      formats: [ "woff", "woff2" ],
                      variants: ['200', '400', '700'],
                      variants: [`thin`, `light`]
                    },
                    {
                      family: `Mulish`,
                      variants: ['200', '400', '700', '900'],
                      formats: [ "woff", "woff2" ],
                    },
                    {
                      family: `Kumbh Sans`,
                      variants: ['300', '400', '700'],
                      formats: [ "woff", "woff2" ],
                    },
            ]},
          },
        },
    ],
}

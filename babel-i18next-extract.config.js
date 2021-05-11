const {defaultLanguage, languages} = require('./languages');

process.env.NODE_ENV = 'test';

module.exports = {
  presets: ['babel-preset-gatsby'],
  plugins: [
    [
      'i18next-extract',
      {
        keySeparator: null,
        nsSeparator: null,
        keyAsDefaultValue: [defaultLanguage],
        useI18nextDefaultValue: [defaultLanguage],
        locales: languages,
        discardOldKeys: false,
        defaultNS: 'translation',
        outputPath: 'src/locales/{{locale}}/{{ns}}.json',
        customTransComponents: [['gatsby-plugin-react-i18next', 'Trans']]
      }
    ]
  ]
};

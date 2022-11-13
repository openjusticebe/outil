# Octave

Second version of Outil. 

A nice & clean build to provide :
- multilingual support
- a new interface
- modular extensibility
- refactored parts of the previous Outil tool


## Installation
Dependencies: yarn, gatsby

- Clone repository locally
- `yarn install --dev` to install all dependencies, including development ones
- `gatsby develop` to start development server

## Translations
Octave uses i18next & i18next-react for localization and translations.
Translation files can be found in `./src/locales` and are generated with babel.

### HowTo
To add a new text to translate, simply enclose it with the `Trans` component :

```html
<Trans>Texte à traduire</Trans>
```

Next run `yarn run extract` to extract all translations to the locale files, where the correct translations can be updated:

```json
{
    "Texte à traduire": "Text to translate"
}
```

Available languages are configured in `./languages.js`, and babel configuration is in `babel-i18next-extract.config.js`.

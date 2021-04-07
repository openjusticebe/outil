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
- `yarn install` to install all dependencies
- `gatsby develop` to start development server

## Translations
Octave uses i18next & i18next-react for localization and translations.
Translation files can be found in `./src/locales` and are generated with babel.

### HowTo
To add a new text to translate, simply enclose it with the `Trans` component :

```html
<Trans>Text à traduire</Trans>
```

Next run `yarn run extract` to extract all translations to the locale files, where the correct translations can be updated.

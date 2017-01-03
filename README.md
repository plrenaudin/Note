# Yet another markdown editor

Note is a Markdown editor / previewer focused on note taking.

* It uses [LokiJS](http://lokijs.org/) with the [indexedDB](https://developer.mozilla.org/en/docs/Web/API/IndexedDB_API) adapter
for storing the data locally in your browser.
* It uses [highlight.js](https://highlightjs.org/) to color syntax in code blocks.
* It surrounds pasted text by code block ticks (\`\`\`)


A live demo is available [here](https://plrenaudin.github.io/Note/)

# Quick Start

`npm install`

`npm run build`

The app will be available in the `build` folder

# Contribution

Here is some information if you would like to contribute to this project.

## Dev Stack

* CodeMirror
* VueJS
* Webpack
* LokiJS
* Karma + Jasmine

## Dev setup

Run `npm install` to install dependencies

Run `npm start` to run the webpack dev server

By default the app is available on http://localhost:8080/webpack-dev-server/

Use `npm test` to start Karma

## Todo
This is a non exhaustive list of improvements to be made:

- [ ] Allow raw text paste (do not surround with code block ticks) with `ctrl + shift + v`
- [ ] Support checkboxes in preview
- [ ] Export data in the cloud
- [ ] Improve look and feel / add animations
- [ ] Add keyboard shortcuts
- [ ] Use resizable panes for editor and preview
- [ ] Improve test coverage

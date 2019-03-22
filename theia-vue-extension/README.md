# Theia Vue Extension
Adds VueJs extension support to [Theia IDE](https://www.theia-ide.org/) using customized version of [@devpodio/vue-language-server](https://github.com/Devpodio/vue-language-server) based from [vetur](https://github.com/vuejs/vetur/tree/master/server)

## Requirements
- `v0.2.0` is compatible with Theia `@next` packages. eg. `@theia/core@next`

## Changes v0.2.0

Starting v0.2.0, `theia-vue-extension` now have all the features of [vetur](https://github.com/vuejs/vetur) which includes:
- Syntax-highlighting
- Snippet
- Emmet
- Linting / Error Checking
- Formatting
- Auto Completion
- Debugging

It also adds 20+ new preference options under `vetur` on your theia-ide preferences.

### Notes
Since Theia does not install built-in vscode extensions by default, the `vue-language-server` uses a default configuration.
To learn how to customize these defaults, check the instructions at [@devpodio/vue-language-server](https://github.com/Devpodio/vue-language-server)

## Getting started

Install [nvm](https://github.com/creationix/nvm#install-script).

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash

Install npm and node.

    nvm install 8
    nvm use 8

Install yarn.

    npm install -g yarn

## Development Installation
For local installation:

- `git clone https://github.com/devpodio/theia-vue-extension.git`
- `cd theia-vue-extension`
- `yarn`

## Running the Browser example

    yarn rebuild:browser
    cd browser-app
    yarn start

## Running the Electron example

    yarn rebuild:electron
    cd electron-app
    yarn start

## Publishing vue

Create a npm user and login to the npm registry, [more on npm publishing](https://docs.npmjs.com/getting-started/publishing-npm-packages).

    npm login

Publish packages with lerna to update versions properly across local packages, [more on publishing with lerna](https://github.com/lerna/lerna#publish).

    npx lerna publish

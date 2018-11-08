# Theia Vue Extension
Adds VueJs extension support to [Theia IDE](https://www.theia-ide.org/)

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

- `git clone https://github.com/uniibu/theia-vue-extension.git`
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

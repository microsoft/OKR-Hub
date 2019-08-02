# OKR-Hub

## To Contribute

You must sign a Contribution License Agreement (CLA) before your PR will be merged. This a one-time requirement for Microsoft projects in GitHub. You can read more about Contribution License Agreements (CLA) on Wikipedia.

## Create a vsix to deploy on test environment
1. npm i -g typescript tfx-cli webpack webpack-cli

2. npm install

3. webpack && npm run package:dev 

## Command-line deploy

1. Add a .\commands\local.settings.js with the following contents (replacing the values as appropriate):

```
module.exports = {
    publisher: "REPLACE",
    share: "REPLACE",
    token: "REPLACE"
}
```

- publisher is the name of the Azure DevOps Marketplace publisher.
- share is the name of the Azure DevOps account that you want to install (or have installed) the extension on.
- token is a PAT with Marketplace Publish access. **Must select "All Accessible Organizations" in the Organization dropdown**.

2. From a command line, run the command "npm run deploy". If you''ve already installed the extension, you can just refresh the page to see your changes.

## Watch Mode

If you add autoDeploy: true to your local.settings.file:

```
module.exports = {
    publisher: "REPLACE",
    share: "REPLACE",
    token: "REPLACE",
    autoDeploy: true
}
```

you can run webpack in watch mode (npm run watch or webpack --watch), which does a build and deploy every time you save a file, and is significantly faster.

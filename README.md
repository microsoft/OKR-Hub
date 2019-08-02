# OKR-Hub

## To Contribute

You must sign a Contribution License Agreement (CLA) before your PR will be merged. This a one-time requirement for Microsoft projects in GitHub. You can read more about [Contribution License Agreements (CLA)](https://en.wikipedia.org/wiki/Contributor_License_Agreement) on Wikipedia.

However, you don't have to do this up-front. You can simply clone, fork, and submit your pull-request as usual.

When your pull-request is created, it is classified by a CLA bot. If the change is trivial (i.e. you just fixed a typo) then the PR is labelled with cla-not-required. Otherwise, it's classified as cla-required. In that case, the system will also tell you how you can sign the CLA. Once you have signed a CLA, the current and all future pull-requests will be labelled as cla-signed.

Signing the CLA might sound scary but it's actually very simple and can be done in less than a minute.

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

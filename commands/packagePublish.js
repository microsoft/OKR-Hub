const exec = require("child_process").exec;

const localSettings = require("./local.settings");

const manifest = require("../vss-extension.json");
const extensionId = manifest.id;
const extensionVersion = manifest.version;

const { publisher, share, token } = localSettings;
const command = `tfx extension publish --extension-id ${extensionId}-dev --version ${extensionVersion} --publisher ${publisher} --share-with ${share} --token ${token}`;

exec(command, function (error) {
    if (error) {
        console.log(`Package publish error: ${error}`);
    } else {
        console.log("Package created");
    }
});

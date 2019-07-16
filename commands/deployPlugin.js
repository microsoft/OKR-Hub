const exec = require('child_process').exec;
const manifest = require("../vss-extension.json");
const localSettings = require("./local.settings");
const { publisher, share, token, autoDeploy } = localSettings;
const extensionId = manifest.id;
let extensionVersion = manifest.version;

exports.module = class DeployPlugin {
    apply(compiler) {
        if (autoDeploy) {
            compiler.hooks.done.tap("Done", stats => {
                if (!stats.hasErrors()) {
                    this.buildPackage();
                }
            });
        }
    }

    buildPackage() {
        var createCommand = `tfx extension create --rev-version --manifest-globs vss-extension.json --extension-id ${extensionId}-dev --no-prompt`;
        exec(createCommand, (error, stdout, stderr) => {
            if (stdout) {
                process.stdout.write('Package created.\r\n');
                this.publishPackage();
            }
            if (stderr) process.stderr.write(`Package create error: ${error}\r\n`);
            if (error) process.stderr.write(`Package create error: ${error}\r\n`);
        });
    }

    publishPackage() {
        extensionVersion++;

        const publishCommand = `tfx extension publish --extension-id ${extensionId}-dev --version ${extensionVersion} --publisher ${publisher} --share-with ${share} --token ${token}`;
        exec(publishCommand, (error, stdout, stderr) => {
            if (stdout) process.stdout.write('Package published.\r\n');
            if (stderr) process.stderr.write(`Package publish error: ${error}\r\n`);
            if (error) process.stderr.write(`Package publish error: ${error}\r\n`);
        });
    }
}
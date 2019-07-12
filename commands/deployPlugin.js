const exec = require('child_process').exec;
const manifest = require("../vss-extension.json");
const extensionId = manifest.id;
let extensionVersion = require("../vss-extension.json").version;

exports.module = class DeployPlugin {
    apply(compiler) {
        const localSettings = require("./local.settings");
        const { publisher, share, token, autoDeploy } = localSettings;

        if (autoDeploy) {
            compiler.hooks.done.tap("Done", stats => {
                if (!stats.hasErrors()) {
                    var createCommand = `tfx extension create --rev-version --manifest-globs vss-extension.json --extension-id ${extensionId}-dev --no-prompt`;
                    exec(createCommand, (error, stdout, stderr) => {
                        if (stdout) process.stdout.write('Package created.\r\n');
                        if (stderr) process.stderr.write(`Package create error: ${error}\r\n`);
                        if (error) process.stderr.write(`Package create error: ${error}\r\n`);
                    });

                    extensionVersion++;

                    const publishCommand = `tfx extension publish --extension-id ${extensionId}-dev --version ${extensionVersion} --publisher ${publisher} --share-with ${share} --token ${token}`;
                    exec(publishCommand, (error, stdout, stderr) => {
                        if (stdout) process.stdout.write('Package published.\r\n');
                        if (stderr) process.stderr.write(`Package publish error: ${error}\r\n`);
                        if (error) process.stderr.write(`Package publish error: ${error}\r\n`);
                    });
                }
            });
        }
    }
}
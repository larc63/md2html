const {
    watch
} = require('gulp');

const spawn = require('child_process').spawn;
const runJasmine = function (done) {
    const logConsole = data => console.log(`${data}`.trim());
    const logError = data => console.error(`${data}`.trim());
    const configCommand = 'jasmine';
    const args = [];
    const buildProc = spawn(configCommand, args);

    buildProc.stdout.on('data', logConsole);
    buildProc.stderr.on('data', logError);
    buildProc.on('close', (code) => {
        done();
    });
}

const test = function () {
    watch('src/*.js', runJasmine);
    watch('spec/*.js', runJasmine);
}

exports.default = test;
exports.test = test;
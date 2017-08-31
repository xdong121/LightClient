var yargs = require('yargs').argv;
console.log("command line arguments:", yargs)

var isDev = undefined;
if (yargs._[0] === "serve") {
    isDev = true;
}

module.exports = isDev;
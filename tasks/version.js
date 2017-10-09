const { version: _version } = require('../package.json');

function version() {
    console.log(_version);
}

module.exports = version;

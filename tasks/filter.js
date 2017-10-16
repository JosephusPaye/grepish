#!/usr/bin/env
const EOL = require('os').EOL;
const { filter: filterResults } = require('./shared/search');

function filter({ input, args }, options = { isCLI: true }) {
    const results = filterResults(input, args);

    if (options.isCLI) {
        console.log(results.join(EOL));
    }

    return results;
}

module.exports = filter;

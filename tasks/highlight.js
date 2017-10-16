#!/usr/bin/env
const EOL = require('os').EOL;
const { highlight: highlightResults } = require('./shared/search');

function highlight({ input, args }, options = { isCLI: true }) {
    const results = highlightResults(input, args);

    if (options.isCLI) {
        console.log(results.join(EOL));
    }

    return results;
}

module.exports = highlight;

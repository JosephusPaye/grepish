#!/usr/bin/env
const EOL = require('os').EOL;
const { highlightResults } = require('./shared/search');

function highlight({ input, args }) {
    const results = highlightResults(input, args);
    console.log(results.join(EOL));
}

module.exports = highlight;

#!/usr/bin/env
const EOL = require('os').EOL;
const { filterResults } = require('./shared/search');

function filter({ input, args }) {
    const results = filterResults(input, args);
    console.log(results.join(EOL));
}

module.exports = filter;

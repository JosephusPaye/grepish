const { filter: filterResults } = require('./shared/search');

function count({ input, args }, options = { isCLI: true }) {
    const results = filterResults(input, args);

    if (options.isCLI) {
        console.log(results.length);
    }

    return results.length;
}

module.exports = count;

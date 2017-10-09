const { filterResults } = require('./shared/search');

function count({ input, args }) {
    const results = filterResults(input, args);
    console.log(results.length);
}

module.exports = count;

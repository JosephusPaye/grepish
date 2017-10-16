const count = require('./tasks/count');
const filter = require('./tasks/filter');
const highlight = require('./tasks/highlight');
const search = require('./tasks/shared/search');

module.exports = {
    tasks: {
        count,
        filter,
        highlight
    },
    search
};

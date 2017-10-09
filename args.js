const EOL = require('os').EOL;
const minimist = require('minimist');
const tasks = require('./tasks/index');

const command = minimist(process.argv.slice(2), {
    alias: {
        d: 'delimiter',
        i: 'include',
        x: 'exclude',
        s: 'starts',
        start: 'starts',
        c: 'contains',
        contain: 'contains',
        e: 'ends',
        end: 'ends',
        m: 'match-case',
        r: 'regexp',
        v: 'version',
        h: 'help'
    },
    boolean: ['include', 'exclude', 'match-case', 'help', 'version'],
    string: ['delimiter', 'starts', 'contains', 'ends', 'regexp'],
    default: {
        delimiter: EOL,
        include: true,
        'match-case': false
    }
});

function getArgs() {
    const task = getTask(command);

    const {
        delimiter,
        include,
        exclude,
        'match-case': matchCase,
        starts,
        ends,
        regexp: customRegex,
        help,
        version
    } = command;

    let hasSearch = true;
    let contains = command.contains;

    // If no search argument is given, use the unrecognized arguments (command._)
    // as a contains search query
    if (starts === undefined && contains === undefined && ends === undefined) {
        contains = command._.join(' ');

        if (contains.trim().length === 0) {
            contains = undefined;
            hasSearch = command.regexp !== undefined;
        }
    }

    const args = { delimiter, include, exclude, starts, contains, ends, hasSearch, matchCase, customRegex };

    return { task, args };
}

function getTask(command) {
    let task;

    if (command.help) {
        return 'help'
    }

    if (command.version) {
        return 'version';
    }

    // command._[0] is the first unmatched argument
    if (tasks[command._[0]]) {
        return command._.shift();
    }

    return 'filter';
}

module.exports = {
    getArgs
};

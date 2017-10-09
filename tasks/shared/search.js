const EOL = require('os').EOL;
const chalk = require('chalk');
const escapeStringRegex = require('escape-string-regexp');

function filterResults(input, args) {
    const { delimiter, exclude } = args;

    const lines = input.split(delimiter);
    const regex = createRegex(args);

    return lines.filter(line => {
        const lineMatches = regex.test(line);
        return exclude ? !lineMatches : lineMatches;
    });
}

function highlightResults(input, args) {
    const { delimiter, exclude } = args;

    const lines = input.split(delimiter);
    const regex = createRegex(args, 'g');

    return lines.map(line => {
        return line.trim().replace(regex, (match, ...rest) => {
            // Remove the last two arguments: offset and string
            // See https://goo.gl/IETseS (MDN)
            const groups = rest.slice(0, rest.length - 2);

            let output = chalk.reset.inverse(line);

            groups.forEach(group => {
                output = output.replace(group, chalk.green(group));
            });

            return output;
        });
    });
}

function createRegex(args, flags = '') {
    const { starts, contains, ends, matchCase, customRegex } = args;
    const regexString = customRegex ? customRegex : createRegexString(starts, contains, ends);

    flags = flags.replace(/i/, '');

    return new RegExp(regexString, matchCase ? flags : 'i' + flags);
}

function createRegexString(starts, contains, ends) {
    let regexString = '';

    if (starts) {
        const startsWith = '^';
        regexString += startsWith + '(' + escapeStringRegex(starts) + ')';
    }

    if (contains) {
        const anything = '[\\s\\S]*';
        regexString += anything + '(' + escapeStringRegex(contains) + ')' + anything;
    }

    if (ends) {
        const endsWith = '$';
        regexString += '(' + escapeStringRegex(ends) + ')' + endsWith;
    }

    return regexString;
}

module.exports = {
    filterResults,
    highlightResults,
    createRegex
};

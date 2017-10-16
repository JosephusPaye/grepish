const EOL = require('os').EOL;
const chalk = require('chalk');
const escapeStringRegex = require('escape-string-regexp');
const trimRegex = new RegExp(`^(?:\r?\n?)+|(?:\r?\n?)+$`, 'g');

function filter(input, args) {
    const { delimiter = EOL, exclude } = args;

    const lines = input.split(delimiter);
    const regex = createRegex(args);

    const results = lines
        .filter(line => {
            const lineMatches = regex.test(line);
            return exclude ? !lineMatches : lineMatches;
        })
        .map(trimLineBreaks);

    if (!exclude) {
        return results.map(result => {
            return result.replace(regex, (match, ...rest) => {
                // Remove the last two arguments: offset and string
                // See https://goo.gl/IETseS (MDN)
                const groups = rest.slice(0, rest.length - 2);

                let output = match;

                groups.forEach(group => {
                    output = output.replace(group, chalk.green(group));
                });

                return output;
            });
        });
    }

    return results;
}

function highlight(input, args) {
    const { delimiter = EOL, exclude } = args;

    const lines = input.split(delimiter);
    const regex = createRegex(args, 'g');

    return lines.map(line => {
        if (regex.test(line)) {
            line = chalk.reset.inverse(line);

            return trimLineBreaks(line).replace(regex, (match, ...rest) => {
                // Remove the last two arguments: offset and string
                // See https://goo.gl/IETseS (MDN)
                const groups = rest.slice(0, rest.length - 2);

                let output = match;

                groups.forEach(group => {
                    output = output.replace(group, chalk.green(group));
                });

                return output;
            });
        }

        return trimLineBreaks(line);
    });
}

function trimLineBreaks(value) {
    return value.replace(trimRegex, '');
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
    filter,
    highlight,
    createRegex,
    createRegexString
};

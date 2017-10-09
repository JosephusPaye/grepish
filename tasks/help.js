const chalk = require('chalk');
const { name, version } = require('../package.json');

function help() {
    const header = `${name} ${version}: https://github.com/JosephusPaye/grepish\n`;
    const helpContent = `
${chalk.yellow('Usage:')}
    cat input.txt | grepish [command] [modifier] (text|<pattern>...)
    grepish (--help|--version)

${chalk.yellow('Commands:')}
    ${chalk.green('filter')}          Find and print lines in the input which match the given pattern.
    ${chalk.green('count')}           Count the number of lines in the input which match the given pattern.

${chalk.yellow('Modifiers:')}
    ${chalk.green('-d <d>, --delimiter <d>')}     Use <d> as the delimiter for splitting lines. Defaults to the OS's end of line character.
    ${chalk.green('-x, --exclude')}               Use exclude mode. Will count or print lines not matching the given pattern.
    ${chalk.green('-m, --match-case')}            Use case-sensitive search.

${chalk.yellow('Patterns:')}
    ${chalk.green('-s <p>, --starts <p>')}        Match lines that start with <p>.
    ${chalk.green('-c <p>, --contains <p>')}      Match lines that contain <p> anywhere in the line.
    ${chalk.green('-e <p>, --ends <p>')}          Match lines that end with <p>.
    ${chalk.green('-r <p>, --regexp <p>')}        Use <p> as a JavaScript regular expression to match lines. Do not include delimiters or flags.
`.trim();

    console.log(chalk.cyan(header));
    console.log(helpContent);
}

module.exports = help;

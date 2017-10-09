## grepish

A utility like [grep](https://en.wikipedia.org/wiki/Grep), with a focus on ease of use. Useful for working with text on the command line.

### Installation

```
npm install -g grepish
```

### Usage

```
Usage:
    cat input.txt | grepish [command] [modifier] (text|<pattern>...)
    grepish (--help|--version)

Commands:
    filter          Find and print lines in the input which match the given pattern.
    count           Count the number of lines in the input which match the given pattern.

Modifiers:
    -d <d>, --delimiter <d>     Use <d> as the delimiter for splitting lines. Defaults to the OS's end of line character.
    -x, --exclude               Use exclude mode. Will count or print lines not matching the given pattern.
    -m, --match-case            Use case-sensitive search.

Patterns:
    -s <p>, --starts <p>        Match lines that start with <p>.
    -c <p>, --contains <p>      Match lines that contain <p> anywhere in the line.
    -e <p>, --ends <p>          Match lines that end with <p>.
    -r <p>, --regexp <p>        Use <p> as a JavaScript regular expression to match lines. Do not include delimiters or flags.
```

### License

[MIT](LICENSE)

### TODO

Tests

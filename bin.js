#!/usr/bin/env
const getInput = require('get-stdin');
const tasks = require('./tasks/index');

const { getArgs } = require('./args');
const { args, task } = getArgs();

getInput()
    .then(input => {
        if (!args.hasSearch) {
            tasks['help']({ input, args });
        } else {
            tasks[task]({ input, args });
        }
    })
    .catch(console.error);

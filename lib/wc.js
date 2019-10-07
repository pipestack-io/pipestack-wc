#!/usr/bin/env node
const readline = require('readline');

exports.run = function(options, readale) {
    const r1 = readline.createInterface({
        input: process.stdin
    });

    r1.on('line', (input) => {
        console.log(input);
    });
};
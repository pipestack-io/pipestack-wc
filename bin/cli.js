#!/usr/bin/env node
const wc = require('../lib/wc');

wc(process.argv.slice(2), process.stdin, process.stdout, process.stderr)
    .then(result => {
        process.exit(result);
    })
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })

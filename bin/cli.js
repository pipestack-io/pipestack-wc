#!/usr/bin/env node

const wc = require('../lib/wc');

const options = process.argv.slice(2).join(' ');

wc.run(options, process.stdin);

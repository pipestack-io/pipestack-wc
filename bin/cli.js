#!/usr/bin/env node
const wc = require('../lib/wc');

process.exit(wc(process.argv.slice(2), process.stdin, process.stdout, process.stderr));

#!/usr/bin/env node
const wc = require('../lib/wc');

wc.run(process.argv.slice(2), process.stdin);

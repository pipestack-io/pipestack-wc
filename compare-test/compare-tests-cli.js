#!/usr/bin/env node
const childProcess = require('child_process');
const path = require('path');

const rootPath = path.join(__dirname, '..');
try {
    console.log(childProcess.execSync(`cd .. && docker run -v ${rootPath}:/usr/src/app -w /usr/src/app node:12 node_modules/mocha/bin/mocha --reporter spec --bail --check-leaks compare-test/compare.test.js`).toString());
} catch (e) {
    console.log(e.stdout.toString());
}
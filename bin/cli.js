#!/usr/bin/env node
const wc = require('../lib/wc');

const output = {
    write: function(data) {
        process.stdout.write(data);
    },
    end: function () {
        process.stdout.end();
    }
};

try {
    const input = wc(process.argv.slice(2), output);
    if (typeof input === "number") {
        process.exit(input);
    }

    process.stdin
        .on('data', data => {
            input.write(data.toString('utf-8'));
        })
        .on('close', had_error => {
            if (had_error) {
                throw new Error('Error reading the standard input');
            } else {
                input.end();
            }
        });
} catch (e) {
    process.stderr.end(e.toString());
}

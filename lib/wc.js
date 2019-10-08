const readline = require('readline');

exports.run = function(options, readale) {
    let optionsArray = options;
    if (typeof options === 'string') {
        optionsArray = options.split(' ');
    }

    const r1 = readline.createInterface({
        input: process.stdin
    });

    r1.on('line', (input) => {
        console.log(input);
    });
};
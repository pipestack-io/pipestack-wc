const readline = require('readline');

const EXIT_FAILURE = -1;
const EXIT_SUCCESS = 0;

function usage(writable, status) {
    if (status != EXIT_SUCCESS) {
        writable.end('Try \'wc --help\' for more information.\n');
    } else {
        writable.write(
            `Usage: wc [OPTION]... [FILE]...
Print newline, word, and byte counts for each FILE, and a total line if
more than one FILE is specified.  A word is a non-zero-length sequence of
characters delimited by white space.

With no FILE, or when FILE is -, read standard input.

The options below may be used to select which counts are printed, always in
the following order: newline, word, character, byte, maximum line length.
  -c            print the byte counts
  -m            print the character counts
  -l            print the newline counts
  -w            print the word counts
  --help        display this help and exit
  --version     output version information and exit
`);
        writable.end();
    }

    //       printf (_("\
    // Usage: %s [OPTION]... [FILE]...\n\
    //   or:  %s [OPTION]... --files0-from=F\n\
    // "),
    //               program_name, program_name);
    //       fputs (_("\
    // Print newline, word, and byte counts for each FILE, and a total line if\n\
    // more than one FILE is specified.  A word is a non-zero-length sequence of\n\
    // characters delimited by white space.\n\
    // "), stdout);

    //       emit_stdin_note ();

    //       fputs (_("\
    // \n\
    // The options below may be used to select which counts are printed, always in\n\
    // the following order: newline, word, character, byte, maximum line length.\n\
    //   -c, --bytes            print the byte counts\n\
    //   -m, --chars            print the character counts\n\
    //   -l, --lines            print the newline counts\n\
    // "), stdout);
    //       fputs (_("\
    //       --files0-from=F    read input from the files specified by\n\
    //                            NUL-terminated names in file F;\n\
    //                            If F is - then read names from standard input\n\
    //   -L, --max-line-length  print the maximum display width\n\
    //   -w, --words            print the word counts\n\
    // "), stdout);
    //       fputs (HELP_OPTION_DESCRIPTION, stdout);
    //       fputs (VERSION_OPTION_DESCRIPTION, stdout);
    //       emit_ancillary_info (PROGRAM_NAME);
    //     }
    return status;
}

module.exports = function (options, readable, writable, logWritable) {
    let optionsArray = options;
    if (typeof options === 'string') {
        optionsArray = options.split(' ');
    }

    let print_lines, print_words, print_chars, print_bytes;
    print_bytes = print_words = print_chars = print_bytes = false;
    
    const files = [];

    for (let i = 0, j = optionsArray.length; i < j; i++) {
        const option = optionsArray[i];
        switch (option) {
            case '-c':
                print_bytes = true;
                break;
            case '-m':
                print_chars = true;
                break;
            case '-l':
                print_lines = true;
                break;
            case '-w':
                print_words = true;
                break;
            case '--help':
                return usage(logWritable, EXIT_SUCCESS);
            case '-':
                files.push(option);
                break;
            default:
                if (option.startsWith('-')) {
                    writable.write(`wc: invalid option -- '${option}'\n`)
                    return usage(logWritable, EXIT_FAILURE);
                } else {
                    files.push(option);
                }
        }
    }

    if (!(print_lines || print_words || print_chars || print_bytes)) {
        print_lines = print_words = print_bytes = true;
    }

    // TODO: Process options


    const result = new Promise((resolve, reject) => {
        const r1 = readline.createInterface({
            input: process.stdin
        });

        let lines, words;
        lines = words = 0;

        r1.on('line', (line) => {
            lines++;
            words += line.split(/[ ]+/g).length;
        });
        r1.on('close', (input) => {
            writable.write(String(lines).padStart(7));
            writable.write(String(words).padStart(8)); // TODO: Now working well
            writable.end('\n');
            resolve(0);
        });
    });

    return result;
}

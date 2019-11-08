const EXIT_FAILURE = -1;
const EXIT_SUCCESS = 0;

function usage(output, status) {
    if (status !== EXIT_SUCCESS) {
        output.write('Try \'wc --help\' for more information.\n');
    } else {
        output.write(
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
    }
    output.end();
    return status;
}

function getCounts (lines, words, chars, bytes, file, state) {

    let result = '';
    let increment = -1;
    if (state.printLines) {
        result += lines.toString().padStart(state.numberWidth + increment);
        increment = 0;
    }
    if (state.printWords) {
        result += words.toString().padStart(state.numberWidth + increment);
        increment = 0;
    }
    if (state.printBytes) {
        result += bytes.toString().padStart(state.numberWidth + increment);
        increment = 0;
    }
}

module.exports = function(options, output) {
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
                return usage(output, EXIT_SUCCESS);
            case '-':
                files.push(option);
                break;
            default:
                if (option.startsWith('-')) {
                    output.write(`wc: invalid option -- '${option}'\n`);
                    return usage(output, EXIT_FAILURE);
                } else {
                    files.push(option);
                }
        }
    }

    if (!(print_lines || print_words || print_chars || print_bytes)) {
        print_lines = print_words = print_bytes = true;
    }

    // TODO: Process options

    let lines, words, bytes;
    lines = words = bytes = 0;

    return {
        write: (text) => {
            for (const char of text) {
                switch (char) {
                    case '\n':
                        lines++;
                        break;
                    default:
                        break;
                }
                bytes += Buffer.from(char).length;
            }
        },
        end: () => {
            output.write(String(lines));
            // output.write(String(words).padStart(8)); // TODO: Now working well
            // output.write(String(bytes).padStart(8));
            output.write('\n');
            output.end();
        }
    };
};

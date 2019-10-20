const stream = require('stream');
const StringDecoder = require('string_decoder').StringDecoder;

const EXIT_FAILURE = -1;
const EXIT_SUCCESS = 0;

function usage(writable, status) {
    if (status !== EXIT_SUCCESS) {
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
    return status;
}

function toReadable(input) {
    if (input instanceof stream.Readable) {
        return input;
    } else if (typeof input === 'string') {
        const readable = new stream.Readable;
        readable._read = () => {};
        readable.push(input);
        readable.push(null);
        return readable;
    } else {
        throw TypeError('Input type is not supported');
    }
}

function toWritable(output) {
    if (output instanceof stream.Writable) {
        return output;
    } else if (typeof output === "function") {
        return new stream.Writable({
            write(chunk, encoding, callback) {
                if (this.total === undefined) {
                    this.total = '';
                }
                this.total += new StringDecoder('utf8').write(chunk);
                callback();
            },
            final(callback) {
                callback();
                output(this.total);
            },
            destroy(error, callback) {
                callback();
                output(null);
            }
        });
    } else {
        throw TypeError('Output type is not supported');
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
                return usage(stderr, EXIT_SUCCESS);
            case '-':
                files.push(option);
                break;
            default:
                if (option.startsWith('-')) {
                    stdout.write(`wc: invalid option -- '${option}'\n`);
                    return usage(stderr, EXIT_FAILURE);
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
            output.write(String(lines).padStart(7));
            output.write(String(words).padStart(8)); // TODO: Now working well
            output.write(String(bytes).padStart(8));
            output.write('\n');
            output.end();
        }
    };
};

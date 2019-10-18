const stream = require("stream");
const StringDecoder = require('string_decoder').StringDecoder;

exports.toReadable = function(text) {
    const readable = new stream.Readable;
    readable._read = () => {};
    readable.push(text);
    readable.push(null);
    return readable;
};

exports.toWritable = function(stringCallback) {
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
            stringCallback(this.total);
        },
        writev(chunks, callback) {
            callback();
        },
        destroy(error, callback) {
            callback();
        }
    });
};

exports.failOnStdError = function() {
    return exports.toWritable(() => {
        ''.should.fail();
    });
};

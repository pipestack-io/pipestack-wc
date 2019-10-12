const fs = require('fs');
const path = require('path');
const stream = require("stream");
const StringDecoder = require('string_decoder').StringDecoder;

exports.toReadable = function(filePath) {
    return fs.createReadStream(path.join(__dirname, filePath));
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

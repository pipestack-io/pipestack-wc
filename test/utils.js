const stream = require("stream");
const StringDecoder = require('string_decoder').StringDecoder;

exports.toSingleCallback = function(callback) {
    let result = null;
    return {
        write: (text) => {
            result = (result == null ? '' : result) + text;
        },
        end: () => {
            callback(result);
        }
    };
};

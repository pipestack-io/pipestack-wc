const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty stream', function() {
    it('should return 0 lines', function (done) {
        // Given
        const readable = utils.toReadable('');
        const writable = utils.toWritable((result) => {
            result.should.match(/^ {6}0/g);
            done();
        });

        // When
        wc('-l', readable, writable);
    });
});

describe('A stream with 10 lines separated by \\n', function() {
    it('should return 10 lines', function (done) {
        // Given
        const readable = utils.toReadable('\n\n\n\n\n\n\n\n\n\n');
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^ {5}10/g);
            done();
        });

        // When
        wc('-l', readable, writable);
    });
});

describe('A stream with 10 lines separated by \\r\\n', function() {
    it('should return 10 lines', function (done) {
        // Given
        const readable = utils.toReadable('\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n');
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^ {5}10/g);
            done();
        });

        // When
        wc('-l', readable, writable);
    });
});

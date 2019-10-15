require('should');
const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty stream', function() {
    it('should return 0 lines', function (done) {
        // Given
        const readable = utils.toReadable('./resources/emptyStream.txt');
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
        const readable = utils.toReadable('./resources/10linesLF.txt');
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
        const readable = utils.toReadable('./resources/10linesCRLF.txt');
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^ {5}10/g);
            done();
        });

        // When
        wc('-l', readable, writable);
    });
});

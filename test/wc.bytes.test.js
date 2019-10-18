const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty stream', function() {
    it('should return 0 bytes', function (done) {
        // Given
        const readable = utils.toReadable('');
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^.{15} {7}0/g);
            done();
        });

        // When
        wc('-l', readable, writable, utils.failOnStdError());
    });
});

describe('An empty text', function() {
    it('should return 0 bytes', function (done) {
        // Given
        const readable = '';
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^.{15} {7}0/g);
            done();
        });

        // When
        wc('-l', readable, writable, utils.failOnStdError());
    });
});
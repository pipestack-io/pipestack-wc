const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty stream', function() {
    it('should return 0 words', function (done) {
        // Given
        const readable = utils.toReadable('');
        const writable = utils.toWritable((result) => {
            // Then
            result.should.match(/^.{7} {7}0/g);
            done();
        });

        // When
        wc('-l', readable, writable, utils.failOnStdError());
    });
});
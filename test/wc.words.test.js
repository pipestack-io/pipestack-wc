const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty input', function() {
    it('should return 0 words', function (done) {
        // Given
        const input = '';
        const output = utils.toSingleCallback((result) => {
            // Then
            result.should.match(/^.{7} {7}0/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});
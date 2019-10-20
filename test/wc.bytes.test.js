const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty input', function() {
    it('should return 0 bytes', function (done) {
        // Given
        const input = '';
        const output = utils.toSingleCallback((result) => {
            // Then
            result.should.match(/^.{15} {7}0/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});
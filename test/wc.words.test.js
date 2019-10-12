const utils = require('./utils');

const wc = require('../lib/wc');

test('An empty stream returns 0 words', function(assert) {
    // Given
    const readable = utils.toReadable('./resources/emptyStream.txt');
    const writable = utils.toWritable((result) => {
        // Then
        expect(result).toMatch(/^.{7} {7}0/g);
        assert();
    });

    // When
    wc('-l', readable, writable);
});
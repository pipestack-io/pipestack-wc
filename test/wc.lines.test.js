const utils = require('./utils');

const wc = require('../lib/wc');

test('An empty stream returns 0 lines', function(assert) {
    // Given
    const readable = utils.toReadable('./resources/emptyStream.txt');
    const writable = utils.toWritable((result) => {
        // Then
        expect(result).toMatch(/^ {6}0/g);
        assert();
    });

    // When
    wc('-l', readable, writable);
});

test('A stream with 10 lines separated by \\n returns 10 lines', function(assert) {
    // Given
    const readable = utils.toReadable('./resources/10linesLF');
    const writable = utils.toWritable((result) => {
        // Then
        expect(result).toMatch(/^ {5}10/g);
        assert();
    });

    // When
    wc('-l', readable, writable);
});

test('A stream with 10 lines separated by \\r\\n returns 10 lines', function(assert) {
    // Given
    const readable = utils.toReadable('./resources/10linesCRLF');
    const writable = utils.toWritable((result) => {
        // Then
        expect(result).toMatch(/^ {5}10/g);
        assert();
    });

    // When
    wc('-l', readable, writable);
});

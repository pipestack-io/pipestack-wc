const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty', function() {
    [
        { type: 'string', value: '' },
        { type: 'stream', value: utils.toReadable('') }
    ].forEach(test => {
        it(test.type + ' should return 0 lines', function (done) {
            // Given
            const readable = test.value;
            const writable = utils.toWritable((result) => {
                result.should.match(/^ {6}0/g);
                done();
            });

            // When
            wc('-l', readable, writable, utils.failOnStdError());
        });
    });
});

describe('Some characters with no line feed', function() {
    const TEXT = 'some text';
    [
        { type: 'string', value: TEXT },
        { type: 'stream', value: utils.toReadable(TEXT) }
    ].forEach(test => {
        it('in a ' + test.type + ' should return 1 line', function (done) {
            // Given
            const readable = test.value;
            const writable = utils.toWritable((result) => {
                result.should.match(/^ {6}0/g);
                done();
            });

            // When
            wc('-l', readable, writable, utils.failOnStdError());
        });
    });
});

describe('Ten line feeds', function() {
    const TEN_LINE_FEEDS = '\n\n\n\n\n\n\n\n\n\n';
    [
        { type: 'string', value: TEN_LINE_FEEDS },
        { type: 'stream', value: utils.toReadable(TEN_LINE_FEEDS) }
    ].forEach(test => {
        it('in a ' + test.type + ' should return 10 lines', function (done) {
            // Given
            const readable = test.value;
            const writable = utils.toWritable((result) => {
                // Then
                result.should.match(/^ {5}10/g);
                done();
            });

            // When
            wc('-l', readable, writable, utils.failOnStdError());
        });
    });
});

describe('Ten carriage returns + line feeds', function() {
    const TEN_CRLF = '\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n';
    [
        { type: 'string', value: TEN_CRLF },
        { type: 'stream', value: utils.toReadable(TEN_CRLF) }
    ].forEach(test => {
        it('in a ' + test.type + ' should return 10 lines', function (done) {
            // Given
            const readable = test.value;
            const writable = utils.toWritable((result) => {
                // Then
                result.should.match(/^ {5}10/g);
                done();
            });

            // When
            wc('-l', readable, writable, utils.failOnStdError());
        });
    });
});

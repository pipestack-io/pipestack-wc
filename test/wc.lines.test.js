const utils = require('./utils');

const wc = require('../lib/wc');

describe('An empty input', function() {
    it('should return 0 lines', function (done) {
        // Given
        const input = '';
        const output = utils.toSingleCallback((result) => {
            result.should.match(/^ {6}0/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});

describe('Some characters with no line feed', function() {
    it('should return 1 line', function (done) {
        // Given
        const input = 'some text';
        const output = utils.toSingleCallback((result) => {
            result.should.match(/^ {6}0/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});

describe('Ten line feeds', function() {
    it('should return 10 lines', function (done) {
        // Given
        const input = '\n\n\n\n\n\n\n\n\n\n';
        const output = utils.toSingleCallback((result) => {
            // Then
            result.should.match(/^ {5}10/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});

describe('Ten carriage returns + line feeds', function() {
    it('should return 10 lines', function (done) {
        // Given
        const input = '\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n';
        const output = utils.toSingleCallback((result) => {
            // Then
            result.should.match(/^ {5}10/g);
            done();
        });

        // When
        const result = wc('', output);
        result.write(input);
        result.end();
    });
});

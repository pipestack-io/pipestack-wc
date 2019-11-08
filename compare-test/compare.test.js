const childProcess = require('child_process');

const ECHO_ITERATIONS = 10;
const ECHO_MAX_CHARACTERS = 20;

function randomEchoText(chars) {
    const result = Buffer.alloc(chars);
    for (let i = 0; i < chars; i++) {
        result.fill([...Array(1)].map(_=>(Math.random()*36|0).toString(36)).join``, i);
    }
    return result.toString();
}

function testWithOption(text, options) {
    it(`should return the same result for "${text}" using options ${options}`, function () {
        // Given
        const expected = childProcess.execSync(`echo "${text}" | wc ${options}`).toString();

        // When
        const result = childProcess.execSync(`echo "${text}" | node ./bin/cli.js ${options}`).toString();

        // Then
        result.should.equal(expected);
    });
}

function testWithText(text) {
    testWithOption(text, '-l');
}

describe('echo', () => {
    for (let i = 0; i < ECHO_ITERATIONS; i++) {
        const chars = Math.round(Math.random() * ECHO_MAX_CHARACTERS);
        testWithText(randomEchoText(chars));
    }
});
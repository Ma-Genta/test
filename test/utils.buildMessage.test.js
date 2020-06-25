const assert = require('assert');

const buildMessage = require('../utils/buildMessage');
const { it } = require('mocha');

describe.only('Utils - BuildMessage', () => {
    describe('When receives an entity and an action', () => {
        it('Should return the respective message', function () {
            const result = buildMessage('movie', 'create');
            const expect = "movie created";
            assert.strictEqual(result, expect);
        });
    });

    describe('When receives an entity and an action and is a list', () => {
        it('Should return the respective message with the entity in plural', function () {
            const result = buildMessage('movie', 'list');
            const expect = 'movies listed';
            assert.strictEqual(result, expect);
        });
    });
    
});

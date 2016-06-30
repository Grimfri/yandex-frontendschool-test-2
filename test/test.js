var assert = require('chai').assert;
var Obfuscation = require('../');

describe('Obfuscation', function() {

    it('should return empty object', function () {
        var result = Obfuscation([]);
        assert.equal(0, Object.keys(result).length);
    });

    it('should return object with one key', function () {
        var result = Obfuscation(['test','test','test']);
        assert.equal(1, Object.keys(result).length);
    });

    it('should return object with two keys', function () {
        var result = Obfuscation(['test', 'testAgain', 'test','test']);
        assert.equal(2, Object.keys(result).length);
    });

    it('should return object with three keys', function () {
        var result = Obfuscation(['class1', 'class2', 'class3']);
        assert.equal(3, Object.keys(result).length);
    });
});
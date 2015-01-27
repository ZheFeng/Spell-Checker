var expect = require("chai").expect;
var fs = require("fs");
var bf = require("../index");

var words = fs.readFileSync("./words", {encoding: "UTF8"});
if (words.slice(-1) === '\n') {
  words = words.slice(0, -1);
}
words = words.split("\n")

var hashes = 16
var bits = words.length * hashes;
bits = Math.ceil(bits / 32) * 32;


var bloom = new bf.BloomFilter(
  bits, // number of bits to allocate.
  hashes        // number of hash functions.
);

for (var i = 0; i < words.length; i++) {
  bloom.add(words[i]);
}

// test("abaculus");
// test("abaculuses");
// test("postique");
// test("postiques");
// test("subacrid");
// test("subacrie");

describe('Spell checker', function() {
  it('should be able to detect the word exists in dictionary', function() {
    expect(bloom.test("abaculus")).to.be.true;
    expect(bloom.test("postique")).to.be.true;
    expect(bloom.test("subacrid")).to.be.true;
  });
  it('should be able to detect the word does not exist in dictionary', function() {
    expect(bloom.test("abaculuses")).to.be.false;
    expect(bloom.test("postiques")).to.be.false;
    expect(bloom.test("subacrie")).to.be.false;
  });
  it('random get words from dictionary, all words should true ', function() {
    for(var i = 0; i < 100; i++) {
      var randomIndex = Math.floor(Math.random() * words.length);
      expect(bloom.test(words[randomIndex])).to.be.true;
    }
  });
  it('random get words which not exists in dictionary, all words should false ', function() {
    for(var i = 0; i < 100; i++) {
      var randomIndex = Math.floor(Math.random() * words.length);
      expect(bloom.test(words[randomIndex] + "notexist")).to.be.false;
    }
  });
});

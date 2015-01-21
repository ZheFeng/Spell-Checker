var bf = require("./bloomfilter");
var fs = require("fs")

console.log("Load all words.")

var words = fs.readFileSync("./words", {encoding: "UTF8"});
if (words.slice(-1) === '\n') {
  words = words.slice(0, -1);
}
words = words.split("\n")

console.log(words.length + " words loaded.")




var hashes = 16
var bits = words.length * hashes;


console.log("number of hash functions: ", hashes)
console.log("number of bits to allocate: ", bits)


var bloom = new bf.BloomFilter(
  bits, // number of bits to allocate.
  hashes        // number of hash functions.
);


for (var i = 0; i < words.length; i++) {
  bloom.add(words[i]);
}

var test = function(word) {
  console.log("'" + word + "' exist: \t", bloom.test(word));
}

// Test if an item is in our filter.
// Returns true if an item is probably in the set,
// or false if an item is definitely not in the set.
console.log("\n");
test("abaculus");
test("abaculuses");
test("postique");
test("postiques");
test("subacrid");
test("subacrie");


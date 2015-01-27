# Spell Checker
```
npm install
npm test
```
The output will be words count, bits number, hash function number and bloonfilter result
```
> SpellChecker@1.0.0 test /Users/zhefeng/development/myob/SpellChecker
> mocha test/*Test.js



  Spell checker
    ✓ should be able to detect the word exists in dictionary
    ✓ should be able to detect the word does not exist in dictionary
    ✓ random get words from dictionary, all words should true
    ✓ random get words which not exists in dictionary, all words should false


  4 passing (9ms)
```

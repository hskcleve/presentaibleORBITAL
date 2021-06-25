const winkNLP = require('wink-nlp');
const its = require('wink-nlp/src/its.js');
const as = require('wink-nlp/src/as.js');

const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);

const patterns = [
    {name: 'descriptors', patterns: [
        'ADJ', // adjectives
        'AUX ADJ', // 'is good'
        'ADV ADJ', // 'very good'
        'ADJ NOUN', // 'nice speech'
        'ADV VERB', //  'well adapted'
        'VERB ADJ', // 'done well'
        'VERB NOUN', // 'included evidence'
        'NOUN VERB', // 'script improving'
        'INTJ', // 'Wow'
        'ADV ADJ NOUN', // 'very interesting speech'
        'PART ADJ', // 'not good, not bad'
        'AUX VERB', // 'have improved'
        'PART VERB ADJ' // 'not doing well'
    ]},
    
];
nlp.learnCustomEntities(patterns);

const toBeParsed = '<put input here>';
const doc = nlp.readDoc(toBeParsed);
//console.log('Original: ' + doc.out())
console.log(doc.customEntities().out());

/*
console.log('the sentence fed in: ' + doc.out());
console.log('the entities found: ' + doc.entities().out(its.detail));
console.log('the tokens found: ' + doc.tokens().out());
console.log('the token type frequencies: ' + doc.tokens().out(its.type, as.freqTable));
*/

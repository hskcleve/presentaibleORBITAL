const winkNLP = require('wink-nlp');
const its = require('wink-nlp/src/its.js');
const as = require('wink-nlp/src/as.js');

const model = require('wink-eng-lite-model');
const nlp = winkNLP(model);

const patterns = [
    {name: 'descriptors', patterns: [
        'AUX ADJ',
        'ADJ AUX',
        'ADV ADJ',
        'ADJ ADV',
        'ADJ NOUN',
        'NOUN ADJ',
        'ADV VERB',
        'VERB ADV',
        'VERB ADJ',
        'VERB NOUN',
        'NOUN VERB',
        'INTJ',
    ]},
    
];
nlp.learnCustomEntities(patterns);

const badReview = 'Your submission is very disappointing. Your points are poorly organised and lack evidence. Pace of speech is slow and formality is poor. Put in more effort next time.';
const doc = nlp.readDoc(badReview);
console.log('Original: ' + doc.out())
console.log('Parsed: ' + doc.customEntities().out(its.pos));

const goodReview = 'Wow. Fantastic script, points are well organised and the flow of ideas is good. Arguments are nuanced. Good pace. Well done!';
const doc2 = nlp.readDoc(goodReview);
console.log('Original: ' + doc2.out())
console.log('Parsed: ' + doc2.customEntities().out(its.pos));


/*
console.log('the sentence fed in: ' + doc.out());
console.log('the entities found: ' + doc.entities().out(its.detail));
console.log('the tokens found: ' + doc.tokens().out());
console.log('the token type frequencies: ' + doc.tokens().out(its.type, as.freqTable));
*/

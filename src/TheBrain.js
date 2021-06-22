const brain = require('brain.js');
const data = require('./trainingdata.json');
const network = new brain.recurrent.LSTM();

const trainingData = data.map(item => ({
    input: item.input,
    output: item.output
}));

network.train(trainingData, {iterations: 200});

const output = network.run("you are bad");
console.log('output:' + output);
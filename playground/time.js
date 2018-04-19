var moment = require('moment');

var date = moment();

date.add(20, 'm');

//see docs for additions/subtractions and the patterns to use for formatting
console.log(date.format('DD/MM/YYYY HH:mm'));
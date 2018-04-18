const path = require('path');
const express = require('express');

var app = express()

const publicPath = path.join(__dirname, '..', '/public');

app.use(express.static('public'));
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
 
app.listen(3000, ()=>{
    console.log('listening on port 3000');
});
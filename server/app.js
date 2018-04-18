const path = require('path');
const express = require('express');

var app = express()

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

app.use(express.static('public'));
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
 
app.listen(port, ()=>{
    console.log('listening on port '+port);
});
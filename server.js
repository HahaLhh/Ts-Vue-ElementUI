const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/dist/index.html');
})

app.listen(8080,()=>{
    console.log('running!!');
    
})
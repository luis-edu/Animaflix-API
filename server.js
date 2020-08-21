require('dotenv').config();

const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyparser.json())

//Suporte a arquivos estaticos
app.use('/files', express.static(path.resolve(__dirname,'assets')));

app.use(require('./src/routes'));

//404 page


var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('this shit is now running', port)
});
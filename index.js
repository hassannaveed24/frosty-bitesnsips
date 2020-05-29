
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const helmet = require('helmet');
const compression = require('compression');
const Joi = require('joi');
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');


require('./startup/routes')(app);


app.set('view engine','pug');
app.set('views','./views');


Joi.objectId = require('joi-objectid')(Joi);

app.use(helmet());
app.use(compression());

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, ");
    next();

});

const db = config.get('db');
mongoose.connect(db, {
     useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
    .then(() => winston.info('Connected to MongoDB..'));

    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

const port = process.env.PORT || 3000;
app.listen(port,()=> winston.info(`Listening on port: ${port}` ));

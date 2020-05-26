const winston = require('winston');

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/validation');
require('./startup/prod')(app);

app.set('view engine','pug');
app.set('views','./views');

const db = config.get('db');
mongoose.connect(db, {
     useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
    .then(() => winston.info('Connected to MongoDB..'));

    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }

const port = process.env.PORT || 3000;
app.listen(port,()=> winston.info(`Listening on port: ${port}` ));

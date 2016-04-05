import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from 'config';
import mongoose from 'mongoose';

process.title = 'asynchronous-todo';

var app = express();
app.server = http.createServer(app);

mongoose.connect(config.get('dbConfig.host'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

module.exports = app;

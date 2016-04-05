import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import config from 'config';
import mongoose from 'mongoose';
import routes from './routes';

process.title = 'asynchronous-todo';

var app = express();
app.server = http.createServer(app);

mongoose.connect(config.get('dbConfig.host'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', routes());

module.exports = app;

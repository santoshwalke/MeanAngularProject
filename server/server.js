import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config/db';

import router from './routes/router';

const app = express();
const port = process.env.port || 3000;

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/', router);

mongoose.connect(config.db, 
    { 
        useNewUrlParser: true,
        useCreateIndex: true
    });

mongoose.connection.on('connected', () => {
    console.log('Connected to database'+config.db);
});

mongoose.connection.on('error', (err) => {
    console.log('Database error '+err);
  });

app.listen(port, () => {
    console.log('Server Start on port', port);
});

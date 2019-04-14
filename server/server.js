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
app.use('/uploads', express.static('uploads'));
app.use('/', router);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });

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

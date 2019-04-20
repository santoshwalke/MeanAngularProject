import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import config from './config/db';

import user from './routes/router';
import recipe from './routes/recipe';

const app = express();
const port = process.env.port || 3000;

app.use( cors() );
app.use( morgan( "dev" ) );
// app.use( morgan( 'combined' ) );
app.use( bodyParser.json() );
app.use( '/uploads', express.static( 'uploads' ) );


app.use( ( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.removeHeader( "X-Powered-By" );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if ( req.method === "OPTIONS" ) {
        res.header( "Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET" );
        return res.status( 200 ).json( {} );
    }
    next();
} );

// Routing 
app.use( '/user', user );
app.use( '/recipe', recipe );

app.use( function ( err, req, res, next ) {
    console.error( err.stack )
    res.status( 500 ).send( 'Something broke!' )
} );


mongoose.connect( config.db, {
    useNewUrlParser: true,
    useCreateIndex: true
} );

mongoose.connection.on( 'connected', () => {
    console.log( 'Connected to database' + config.db );
} );

mongoose.connection.on( 'error', ( err ) => {
    console.log( 'Database error ' + err );
} );

app.listen( port, () => {
    console.log( 'Server Start on port', port );
} );
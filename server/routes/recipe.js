import express from 'express';
import mongoose from 'mongoose';
import verify from '../config/verify';

const router = express.Router();

import recipes from '../models/recipes';

router.get( '/', verify, ( req, res, next ) => {
    recipes.find()
        .exec()
        .then( response => {
            res.status( 200 ).json( response )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                error: err
            } );
        } )
} );

router.post( '/add', verify, ( req, res, next ) => {
    let recipe = new recipes( {
        '_id': new mongoose.Types.ObjectId(),
        'name': req.body.name,
        'description': req.body.description,
        'imagePath': req.body.imagePath
    } );
    for ( let ingredients of req.body.ingredients ) {
        recipe.ingredients.push( {
            'name': ingredients.name,
            'amount': ingredients.amount
        } );
    }
    recipe.save()
        .then( response => {
            res.status( 200 ).json( response )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                error: err
            } );
        } )
} );

router.post( '/find', verify, ( req, res, next ) => {
    recipes.findOne( {
            '_id': new mongoose.Types.ObjectId( req.body._id )
        } )
        .exec()
        .then( response => {
            res.status( 200 ).send( {
                response: response
            } )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                error: err
            } );
        } )
} );

router.delete( '/delete', verify, ( req, res, next ) => {
    recipes.findByIdAndRemove( req.body.id )
        .exec()
        .then( response => {
            res.status( 200 ).send( {
                response: response
            } )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                error: err
            } );
        } )
} );

router.put( '/update', verify, ( req, res, next ) => {
    let ingredient = [];
    const {
        data
    } = req.body;

    const {
        ingredients,
        name,
        description,
        imagePath
    } = data;
    for ( let ingredientItem of ingredients ) {
        ingredient.push( {
            'name': ingredientItem.name,
            'amount': ingredientItem.amount
        } );
    }
    recipes.update( {
            "_id": req.body._id
        }, {
            $set: {
                'name': name,
                'description': description,
                'imagePath': imagePath,
                'ingredients': ingredient
            }
        } )
        .exec()
        .then( response => {
            res.status( 200 ).send( {
                status: response.nModified === 1 ? true : false
            } )
        } )
        .catch( err => {
            res.status( 500 ).send( {
                error: err
            } );
        } )
} );

module.exports = router;
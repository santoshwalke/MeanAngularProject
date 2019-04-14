import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verify from '../config/verify';

import user from '../models/user';

const router = express.Router();

// Auth action
router.post('/register', (req, res, next) => {

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        } else {
            let newUser = new user({
                'email': req.body.email,
                'password': hash
            });
            newUser.save()
                .then(response => {
                    res.status(200).send({
                        'response': response
                    });
                })
                .catch(error => {
                    res.status(400).send({
                        'error': error
                    })
                });
        }
    });
});

router.post('/login', (req, res, next) => {
    user.findOne({
            'email': req.body.email
        })
        .exec()
        .then(response => {
            if (!response) {
                res.status(201).json({
                    success: false,
                    message: 'Incorrect login credentials.'
                });
            } else if (response) {
                // console.log(response);
                bcrypt.compare(req.body.password, response.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                    if (result) {
                        const token = jwt.sign({
                                email: response.email,
                                userId: response._id
                            },
                            process.env.JWT_KEY || 'recipe', 
                            {
                                expiresIn: "1h"
                            }
                        );
                        res.status(200).json({
                            message: "Auth successful",
                            token: token
                        });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                'error': err
            })
        });
});

// router.get('/all', verify, (req, res, next) => {
    
//     user.find({
//         email: 'test@mail.com'
//     })
//     .exec()
//     .then(response => {
//         res.status(200).send({
//             response: response
//         })
//     })
//     .catch(err => {
//         res.status(500).send({
//             error: err
//         });
//     })
// });


module.exports = router;

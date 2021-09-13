const express = require('express');
const authController = require('../controllers/auth');
const {body} = require('express-validator');

const User = require ('../models/user');
const router = express.Router();
            
router.post('/register',[
                    body('email')
                        .isEmail()
                        .withMessage('Please enter a valid email.')
                        .custom((email, { req }) => {
                            return User.findByEmail(email).then((user) => {
                                if (user) {
                                    return Promise.reject('already exists!');
                                }
                            });
                        })
                        .normalizeEmail(),
                    body('password').trim().isLength({ min: 5 }),
                    body('name').trim().not().isEmpty(),
                    ],
                    authController.register
);

router.post('/login',authController.login);

module.exports = router;
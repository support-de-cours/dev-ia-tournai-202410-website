const { check } = require('express-validator');

exports.registration = [
    check('firstname', 'Firstname is required').not().isEmpty(),
    check('lastname', 'Lastname is required').not().isEmpty(),
    check('email', 'Write a valid email address').isEmail(),
    check('password')
        .not().isEmpty().withMessage('Password is required')
        .isLength({min: 6}).withMessage('Password must be at least 6 characters long')
    ,
];
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('./../Models/UserModel');

/**
 * 
 * @param Request request 
 * @param Response response 
 * @returns void
 */
exports.registration = async (request, response) => {
    
    let { 
        firstname, 
        lastname, 
        email, 
        password
    } = request.body;
    
    const errors = validationResult(request);


    // Form treatment
    if (request.method === 'POST' && errors.isEmpty()) {
        
        // Check if user exists

        // User exists -> send error (User already exists)

        // User don't exists -> Save user in Database
        // let user = new User({
        //     firstname,
        //     lastname,
        //     email,
        //     password
        // });
        // await user.save();

        // Redirect to /login

        
        console.log(request.body);
        response.send('Form VALID !!')
        return;
    }
    
    response.render('pages/security/registration', {
        errors: errors.array(),
        firstname: firstname,
        lastname: lastname,
        email: email,
    });
};

/**
 * 
 * @param Request request 
 * @param Response response 
 * @returns void
 */
exports.authentication = (request, response) => {
    response.render('pages/security/authentication');
};

/**
 * 
 * @param Request request 
 * @param Response response 
 * @returns void
 */
exports.logout = (request, response) => {

};

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
        let user = await User.findOne({email});
        console.log( user );
        
        // User exists -> send error (User already exists)
        if (user) {
            return response.render('pages/security/registration', {
                errors: [{ msg: "L'utilisateur existe déjà" }],
                firstname: firstname,
                lastname: lastname,
                email: email,
            });
        }

        // User don't exists -> Save user in Database
        user = new User({
            firstname,
            lastname,
            email,
            password
        });
        await user.save();

        // Redirect to /login
        return response.redirect('/login');
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

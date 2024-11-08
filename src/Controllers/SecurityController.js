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
exports.authentication = async (request, response) => {

    // Retrieve form data
    const {
        email,
        password
    } = request.body;

    const errors = [];

    // Test the POST request
    if (request.method === 'POST')
    {
        // Check Email & Pass
        if (!email || !password) {
            errors.push({ msg: "Please enter both email and password." });
            return response.render('pages/security/authentication', {
                errors: errors,
            });
        }
    
        // Find the User
        let user = await User.findOne({email});
    
        // User don't exists -> error
        if (!user) {
            errors.push({ msg: "Invalid credentials" });
            return response.render('pages/security/authentication', {
                errors: errors,
            });
        }

        // User exists -> Login process
        // Login process - part 1 : Verify password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            errors.push({ msg: "Invalid credentials" });
            return response.render('pages/security/authentication', {
                errors: errors,
            });
        }

        // Login process - part 2 : Create user session
        user.password = null;
        request.session.user = user;
        // return request.redirect( request.get('Referrer') || '/' ); 
        return response.redirect( '/' ); 
    }

    response.render('pages/security/authentication');
};

/**
 * 
 * @param Request request 
 * @param Response response 
 * @returns void
 */
exports.logout = (request, response) => {
    request.session.destroy( err => {
        if (err) {
            console.error('Error during logout:', err);
            return response.redirect('/'); 
        }
    });

    return response.redirect('/login'); 
};

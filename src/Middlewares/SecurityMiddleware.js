exports.isGranted = () => {
}

exports.isAuthenticated = (request, response, next) => {
    if (request.session.user) {
        return response.redirect('/');
    }

    next();
}

/**
 * Check if user is logged in
 * 
 * @param Request request
 * @param Response response
 * @param Next next
 * @returns Bool
 */
exports.isLogged = (request, response, next) => {

    // Get user session
    response.locals.isLogged = !!request.session.user;

    // Get user name
    response.locals.username = request.session.user 
        ? `${request.session.user.firstname} ${request.session.user.lastname}`
        : null
    ;

    // Next
    next();
}


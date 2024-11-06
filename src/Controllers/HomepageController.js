/**
 * Display the Homepage
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
exports.index = (request, response) => {
    response.render('pages/homepage/index');
}
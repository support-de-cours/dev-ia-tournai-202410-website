/**
 * Display the Homepage
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
exports.index = (request, response) => {

    let username = "BOBBY";
    const isOk = false;
    const fruits = ['Pommes', 'Poires', 'Kiwis'];
    
    if (request.session.user) {
        username = request.session.user.firstname
    }

    response.render('pages/homepage/index', {
        username: username,
        isOk: isOk,
        fruits: fruits
    });
}
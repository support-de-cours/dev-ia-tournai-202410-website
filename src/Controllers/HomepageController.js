/**
 * Display the Homepage
 * 
 * @param {Request} request 
 * @param {Response} response 
 */
exports.index = (request, response) => {

    let username = "John";
    const isOk = false;
    const fruits = ['Pommes', 'Poires', 'Kiwis'];

    response.render('pages/homepage/index', {
        username: username,
        isOk: isOk,
        fruits: fruits
    });
}
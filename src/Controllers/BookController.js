exports.index = (request, response) => {
    response.render('pages/books/index')
}

exports.create = (request, response) => {
    response.render('pages/books/create')
}

exports.read = (request, response) => {
    response.render('pages/books/read')
}

exports.update = (request, response) => {
    response.render('pages/books/update')
}

exports.delete = (request, response) => {
    response.render('pages/books/delete')
}
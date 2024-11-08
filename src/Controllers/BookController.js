const { validationResult } = require('express-validator');
const Book = require('./../Models/BookModel');

exports.index = (request, response) => {
    response.render('pages/books/index')
}

exports.create = (request, response) => {
    response.render('pages/books/create')
}

exports.read = async (request, response) => {

    const { id } = request.params; 
    const book = await Book.findById(id);

    if (!book) {
        return response.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    res.render('pages/book/read', {
        book: book
    })

    response.render('pages/books/read')
}

exports.update = (request, response) => {
    response.render('pages/books/update')
}

exports.delete = (request, response) => {
    response.render('pages/books/delete')
}
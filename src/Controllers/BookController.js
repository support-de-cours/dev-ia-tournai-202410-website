const { validationResult } = require('express-validator');
const Book = require('./../Models/BookModel');

/**
 * Books Index - Show all books
 * 
 * @param Request request - not used
 * @param Response response 
 */
exports.index = async (request, response) => {
    const books = await Book.find();
    response.render('pages/books/index', {
        books: books
    })
}

exports.create = async (request, response) => {

    const { 
        title, 
        description, 
        price 
    } = request.body;

    const errors = validationResult(request);

    let book; 
    
    if (request.method === 'POST' && errors.isEmpty()) {

        book = new Book({ 
            title, 
            description, 
            price 
        });

        await book.save();

        return response.redirect(`/book/${book._id}`);
    }

    response.render('pages/books/create', {
        errors: errors.array(),
        book: book,
        title: title,
        description: description,
        price: price,
    })
}

exports.read = async (request, response) => {

    const { id } = request.params; 
    const book = await Book.findById(id);

    if (!book) {
        return response.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    response.render('pages/books/read', {
        book: book
    })
}

exports.update = async (request, response) => {

    // Retrieve Book data
    const { id } = request.params;
    const book = await Book.findById(id);

    // Not found if Book is empty
    if (!book) {
        return request.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    // Form validation
    const errors = validationResult(request);

    // Define book data
    const title       = request.body.title || book.title;
    const description = request.body.description || book.description;
    const price       = request.body.price || book.price;

    // Check form submission (POST) && No error
    if (request.method === 'POST' && errors.isEmpty()) {

        // Mongo find the book and update data
        await Book.findByIdAndUpdate(id, {
            title,
            description,
            price,
        });

        return response.redirect(`/book/${id}`);
    }

    // Rendering
    response.render('pages/books/update', {
        errors: errors.array(),
        book: book,
        title: title,
        description: description,
        price: price,
    });
}

exports.delete = async (request, response) => {

    const { id } = request.params;
    const book = await Book.findById(id);

    if (!book) {
        return response.status(404).render('pages/error/not-found', {
            errors: [{ msg: "Book not found." }],
        });
    }

    if (request.method === 'POST' && request.body._method === 'DELETE') {
        await Book.deleteOne({ _id: id });
        return response.redirect(`/books`);
    }

    response.render('pages/books/delete', {
        book: book
    })
}
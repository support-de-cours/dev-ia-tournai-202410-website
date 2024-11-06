const express = require('express');
const router = express.Router();

const homepageController = require('./../src/Controllers/HomepageController');
const bookController = require('./../src/Controllers/BookController');

// Define some routes
// --

// Syntax
// router.<methodHttp>('path', [middleware, middleware, ... ], Controller function )
// router.<methodHttp>('path', Controller function )

// Homepage
router.get('/', homepageController.index);

// Contact
router.get('/contact', contactController.form);
router.post('/contact', contactController.treatment);

// Book
// index    site.com/books
router.get('/books', bookController.index)

// create   site.com/book
router.get('/book', bookController.create);
router.post('/book', bookController.create);

// read     site.com/book/42
router.get('/book/:id', bookController.read);

// update   site.com/book/42/edit
router.get('/book/:id/edit', bookController.update);
router.post('/book/:id/edit', bookController.update);

// delete   site.com/book/42/delete
router.get('/book/:id/delete', bookController.delete);
router.post('/book/:id/delete', bookController.delete);


// Export router
// --

module.exports = router;

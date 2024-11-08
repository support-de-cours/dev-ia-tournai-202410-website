const express = require('express');
const router = express.Router();

// Imports controller
// --

const securityChecker = require('./../src/Checker/SecurityChecker');
const securityMiddleware = require('../src/Middlewares/SecurityMiddleware');

const homepageController = require('./../src/Controllers/HomepageController');
const contactController = require('./../src/Controllers/ContactController');
const bookController = require('./../src/Controllers/BookController');
const securityController = require('./../src/Controllers/SecurityController');


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


// Security router
// --

router.get('/register', securityMiddleware.isAuthenticated, securityController.registration);
router.post('/register', securityChecker.registration, securityController.registration);

router.get('/login', securityMiddleware.isAuthenticated, securityController.authentication);
router.post('/login', securityController.authentication);

router.get('/logout', /* isGranted ,*/ securityController.logout);


// Export router
// --

module.exports = router;

const router = require("express").Router();
const dotenv = require('dotenv').config()

const booksController = require("../../controller/booksController");

// const API_KEY = process.env.REACT_APP_API_KEY;
// console.log(API_KEY);

//matches with "/api/books/:search"
router
    .route("/:search")
    .get(booksController.findBySearch);

module.exports = router;
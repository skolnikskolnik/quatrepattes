const router = require("express").Router();
const booksController = require("../../controller/booksController");


//matches with "/api/books/:search"
router
    .route("/:search")
    .get(booksController.findBySearch);

module.exports = router;
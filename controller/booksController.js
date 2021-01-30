const fetch = require("node-fetch");
const dotenv = require('dotenv');
dotenv.config();

let apiURL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = process.env.REACT_APP_API_KEY;



module.exports = {
    findBySearch: function(req, res){

        let searchTerm = req.params.search;

        apiURL += searchTerm;
        apiURL += "&printType=books&key=";
        apiURL += API_KEY;

        fetch(apiURL).then(result => {
            apiURL = "https://www.googleapis.com/books/v1/volumes?q=";
            return result.json();
        }).then(response => res.json(response))
    }
}
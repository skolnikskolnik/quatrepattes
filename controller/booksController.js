const fetch = require("node-fetch");


let apiURL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = process.env.REACT_APP_API_KEY;
console.log(API_KEY);



module.exports = {
    findBySearch: function(req, res){

        let searchTerm = req.params.search;

        apiURL += searchTerm;
        apiURL += "&printType=books&key=";
        apiURL += API_KEY;

        console.log(apiURL);

        fetch(apiURL).then(result => {
            return result.json();
        }).then(response => res.json(response))
    }
}
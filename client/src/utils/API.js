import axios from "axios";


export default{
    getBookBySearch: function(search){
        return axios.get("/api/books/" + search);
    }

}


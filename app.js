const express = require("express");
const app = express();
const request = require("request");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/data", function(req, res) {

    var searchTerm = req.query.searchterm;
    
   
    if (typeof searchTerm === 'undefined') {
        request("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences", function(error, response, body) {
            if (error) {

                console.log(error);
            } else {
                var jsonData = JSON.parse(body);
              

                res.render("homepage", {

                    apiDataPaid: jsonData.paid,
                    apiDataFree:jsonData.free
                  


                });
            }
        });
    } else {
        searchTerm = searchTerm.toLowerCase();

        request("https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences", function(error, response, body) {
            if (error) {

                console.log(error);
            } else {
                var jsonData = JSON.parse(body);
                // console.log(searchTerm);

                let paid = jsonData.paid;
                let free=jsonData.free;

                let result = paid.filter(element => {
                    let s = JSON.stringify(element).toLowerCase();
                    return s.indexOf(searchTerm) > -1;

                });

                let result1 = free.filter(element => {
                    let s = JSON.stringify(element).toLowerCase();
                    return s.indexOf(searchTerm) > -1;

                });

                    res.render("homepage", {

                    apiDataPaid: result,
                    apiDataFree:result1


                });

            }
        });


    }
});

app.listen("3000", function() {
    console.log("server is running");

});
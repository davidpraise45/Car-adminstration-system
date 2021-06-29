const express = require('express');
const customerRoute = express.Router();

let Buyer = require("../model/Buyer");

// get all the buyers who bought a specific car in the database
customerRoute.route("/customer").get((req, res) => {

    Buyer.aggregate([
        {
            $lookup: {
                from: "car",
                localField: "carId",
                foreignField: "carId",
                as: "car"
            }
        }
    ]).exec(function(err, result) { 
        
        if(err) { 
              console.log('error occurred', err); 
              return res.status(400).send("error occurred"); 
        }else{ 
              console.log("Table Merged Properly");  
              return res.status(200).send(JSON.stringify(result)); 
        } 
    });  
});

module.exports = customerRoute; 
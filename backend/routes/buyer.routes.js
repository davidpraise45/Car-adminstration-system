const express = require('express');
const buyerRoute = express.Router();
let Buyer = require('../model/Buyer');

// add buyer into database
buyerRoute.route("/add-buyer").post((req, res, next) => {
    Buyer.create(req.body, (error, data) => {
        if(error){
            return next(error);
        }else {
            res.json(data);
        }
    })
});

// get all the buyers in the database
buyerRoute.route("/get-buyer").get((req, res) => {
    Buyer.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
});

//  get a particular buyer in the database
buyerRoute.route("/get-buyer/:id").get((req, res) => {
    Buyer.findById(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

// update a particular buyer in the database
buyerRoute.route("/update-buyer/:id").put((req, res, next) => {
    Buyer.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
            console.log('Buyer updated successfully!');
        }
    }); 
});

// delete buyer from the database
buyerRoute.route("/delete-buyer/:id").delete((req, res, next) => {
    Buyer.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    });
});


module.exports = buyerRoute;
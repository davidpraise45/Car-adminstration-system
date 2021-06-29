const express = require('express');
const carRoute = express.Router();
let Car = require('../model/Car');

// add car into database
carRoute.route("/add-car").post((req, res, next) => {
    Car.create(req.body, (error, data) => {
        if(error){
            return next(error);
        }else {
            res.json(data);
        }
    })
});

// get all the cars in the database
carRoute.route("/get-car").get((req, res) => {
    Car.find((error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    })
});

//  get a particular car in the database
carRoute.route("/get-car/:id").get((req, res) => {
    Car.findById(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
        }
    });
});

// update a particular car in the database
carRoute.route("/update-car/:id").put((req, res, next) => {
    Car.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
            console.log('Car updated successfully!');
        }
    }); 
});

// delete car from the database
carRoute.route("/delete-car/:id").delete((req, res, next) => {
    Car.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.status(200).json({
                msg: data
            })
        }
    });
});


module.exports = carRoute;
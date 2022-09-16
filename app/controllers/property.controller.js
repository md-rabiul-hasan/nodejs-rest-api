const { request } = require("express");
const db = require("./../models");
const validator = require("./../helper/validate");
const Property = db.property;
const Op = db.Sequelize.Op;

// create and save a new Property object
exports.create = async (req, res) => {

    const validationRule = {
        "property_name": "required|string",
        "address": "required|string",
        "city": "required|string",
        "minimum_price": "required|integer|min:50",
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            const property = {
                property_name: req.body.property_name,
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                minimum_price: req.body.minimum_price,
                maximum_price: req.body.maximum_price,
                ready_to_sell:req.body.ready_to_sell
            }
        
            Property.create(property)
            .then( (data) => {
                res.status(201).send(data)
            })
            .catch( err => {
                res.status(500).send({
                    message: err.message
                })
            })
        }
    }).catch( err => console.log(err))





    // validate request
    // if(!req.body.property_name){
    //     res.status(400).send({
    //         message: "Property name is required"
    //     });
    //     return;
    // }

    

}


// Retrive all Property from the database
exports.findAll = (req, res) => {
    const property_name = req.query.poperty_name;
    var condition = property_name ? { title: { [Op.like] : `%${property_name}%`  } } : null;

    Property.findAll({
        where: condition
    })
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}

// find a single property with an id 
exports.findOne = (req, res) => {
    const id = req.params.id;

    Property.findByPk(id)
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}


// Update a Property by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Property.update(req.body, {
        where: {id: id}
    })
    .then( num => {
        if (num == 1){
            res.send({
                message: 'Property updated successfully'
            })
        }else{
            res.send({
                message: `Cannot update Property with id=${id}. Maybe Property was not found or req.body is empty or same!`
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}


// Delete Property 
exports.delete = (req, res) => {
    const id = req.params.id;
    Property.destroy({
        where: {id: id}
    })
    .then( num => {
        if(num == 1){
            res.send({
                message: 'Property deleted successfully'
            })
        }else{
            res.send({
                message: `Cannot delete Property with id=${id}. Maybe Property was not found or req.body is empty!`
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}


// Delete All 
exports.deleteAll = (req, res) => {
    Property.destroy({
        where: {},
        truncate: false
    })
    .then( num => {
        res.send({
            message: 'All Property deleted successfully'
        })
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}


// Find all published property
exports.allReadyToSaleProperty = (req, res) => {
    Property.findAll({
        where: {
            ready_to_sell: true
        }
    })
    .then( data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}
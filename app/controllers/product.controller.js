const db = require("./../models");
const validator = require("./../helper/validate");
const Op = db.Sequelize.Op;
const Product = db.product;
const Review = db.review;


// Retrive all Property from the database
exports.findAll = (req, res) => {
   
    Product.findAll()
    .then( data => {
        res.send(data);
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}


// create and save a new Property object
exports.store = async (req, res) => {

    const validationRule = {
        "title": "required|string",
        "price": "required|integer|min:50",
        "description": "required|string",
        "published": "required|boolean",
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

            const product = {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                published: req.body.published
            }
        
            Product.create(product)
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

}

// find a single property with an id 
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findOne({
        include: [
            {
                model: Review,
                as: "reviews"
            }
        ],
        where: {
            id: id
        }
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



// update product 
exports.update = async (req, res) => {

    const validationRule = {
        "title": "required|string",
        "price": "required|integer|min:50",
        "description": "required|string",
        "published": "required|boolean",
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

            const id = req.params.id;

            Product.update(req.body, {
                where: {id: id}
            })
            .then( num => {
                if (num == 1){
                    res.send({
                        message: 'Product updated successfully'
                    })
                }else{
                    res.send({
                        message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty or same!`
                    })
                }
            })
            .catch( err => {
                res.status(500).send({
                    message: err.message
                })
            })
        }
    }).catch( err => console.log(err))
}


// Delete Property 
exports.delete = (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: {id: id}
    })
    .then( num => {
        if(num == 1){
            res.send({
                message: 'Product deleted successfully'
            })
        }else{
            res.send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found or req.body is empty!`
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}
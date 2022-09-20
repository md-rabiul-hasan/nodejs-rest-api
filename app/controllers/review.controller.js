const db = require("./../models");
const validator = require("./../helper/validate");
const Op = db.Sequelize.Op;
const Review = db.review;
const Product = db.product;


// Retrive all Property from the database
exports.findAll = (req, res) => {
   
    Review.findAll()
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
        "rating": "required|integer|max:5",
        "description": "required|string",
        "product_id": "required|integer",
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

            const review = {
                rating: req.body.rating,
                description: req.body.description,
                product_id: req.body.product_id
            }
        
            Review.create(review)
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

    Review.findOne({
        include:[{
            model: Product,
            as: 'product'
        }],
        where: {id: id}
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
        "rating": "required|integer|max:5",
        "description": "required|string",
        "product_id": "required|integer",
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

            Review.update(req.body, {
                where: {id: id}
            })
            .then( num => {
                if (num == 1){
                    res.send({
                        message: 'Review updated successfully'
                    })
                }else{
                    res.send({
                        message: `Cannot update Review with id=${id}. Maybe Review was not found or req.body is empty or same!`
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
    Review.destroy({
        where: {id: id}
    })
    .then( num => {
        if(num == 1){
            res.send({
                message: 'Review deleted successfully'
            })
        }else{
            res.send({
                message: `Cannot delete Review with id=${id}. Maybe Review was not found or req.body is empty!`
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}
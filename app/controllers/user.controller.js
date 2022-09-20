const db = require("./../models");
const validator = require("./../helper/validate");
const config = require("./../config/auth.config");
const Op = db.Sequelize.Op;
const User = db.user;
const Role = db.role;
const jwt = require("jsonwebtoken");

// all User from the database
exports.userInfo = (req, res) => {
   
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1], decoded;
        try {
            decoded = jwt.verify(authorization, "nodejs-jwt");
           
        } catch (e) {
            return res.status(401).send('authorized');
        }

        var id = decoded.id;
       
        User.findOne({
            include:[{
                model: Role,
                as: 'roles'
            }],
            where: {id: id}
        })
        .then( (data) => {
            //console.log(data);
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
       
       
    }else{
        return res.send(500);
    }
    

}
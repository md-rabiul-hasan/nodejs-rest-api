const db = require("./../models");
const config = require("./../config/auth.config");
const User = db.user;
const Role = db.role;

const op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// signup
exports.signup = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then( (user) => {
        if(req.body.roles){
            Role.findAll({
                where: {
                    name: {
                        [Op.or] : req.body.roles
                    }
                }
            })
            .then( (roles) => {
                user.setRoles(roles).then( () => {
                    res.send({
                        message: "User created successfully"
                    })
                })
            })
        }else{
            // user role = 1
            user.setRoles([1]).then(() => {
                res.send({ message: "User created successfully"})
            })
        }
    })
    .catch( err => {
        res.status(500).send({
            message: err.message
        })
    })
}

// singin
exports.singin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then( user => {

        if(!user){
            return res.status(404).send({
                message: "User not found"
            })
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );

        if(!passwordIsValid){
            return res.status(401).send({
                message: "Invalid password"
            })
        }
        var token = jwt.sing({ id: user.id }, config.secret, {
            expiresIn: config.expiration
        });

        var authorities = [];

        user.getRoles().then( roles => {
            for(let i=0; i<roles.length; i++){
                authorities.push("ROLE_"+roles[i].name.toUpperCase());
            }

            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles:authorities,
                accessToken: token
            });

        })



    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}
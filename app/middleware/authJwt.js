const jwt = require("jsonwebtoken");
const config = require("./../config/auth.config");
const db = require("./../models");
const User = db.user;

exports.verifyToken = (req, res, next) => {
    console.log(req.headers)
    let token = req.headers["x-access-token"] || req.headers.authorization;
    
    if(!token){
        return res.status(403).send({
            message: "No token provided",
        });
    }
    let token_array = token.split(" ");
    token = token_array[1];

    jwt.verify(token, config.secret, (err, decoded) => {
        
        if(err){
            return res.status(401).send({
                message: "Unauthorized",
            });
        }

        console.log("decoded" + decoded)

        req.userId = decoded.id;
        next();

    });
}

exports.isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for(let i=0; i < roles.length; i++){
                if(roles[i].name == "admin"){
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Require Admin Role"
            });
            return;
        });
    });
}
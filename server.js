const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./app/routes/auth.routes");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse request of content type  application/json
app.use(bodyParser.json());

// parse request of content type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync({alter: true}).then(() => {
    console.log("Drop and Resync DB");
    // initial();
});

// routes 
app.use("/api/user", authRouter);



// set port, listen for request
const PORT = 8081;
app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});


function initial(){
    Role.create({
        id: 1,
        name: 'user'
    });

    Role.create({
        id: 2,
        name: 'admin'
    });
}
const config = require("./../config/db.config");

const Sequelize = require("Sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.DIALECT,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,
        }
    }   
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// // models
db.user = require("./../models/user.model")(sequelize, Sequelize);
db.role = require("./../models/role.model")(sequelize, Sequelize);
db.property = require("./../models/property.model")(sequelize, Sequelize);
db.product = require("./../models/product.model")(sequelize, Sequelize);
db.review = require("./../models/review.model")(sequelize, Sequelize);

// relations roles and users table
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
});

// relations between user and roles table
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
});

// 1 to many relations 
db.product.hasMany(db.review, {
    foreignKey: "product_id",
    as: "reviews"
});

db.review.belongsTo(db.product, {
    foreignKey: "product_id",
    as: "product"
})


db.ROLES = ["user", "admin"];

// console.log(db);

module.exports = db;


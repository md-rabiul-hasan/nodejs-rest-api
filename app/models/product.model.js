module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products' ,{ 
        title: {
            type: Sequelize.STRING,
        },
        price:{
            type: Sequelize.DECIMAL
        },
        description:{
            type: Sequelize.TEXT
        },
        published:{
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        }
    });

    return Product;
}
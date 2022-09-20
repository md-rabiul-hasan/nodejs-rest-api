module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("reviews", {
        rating: {
            type: Sequelize.INTEGER
        },
        description:{
            type: Sequelize.TEXT
        }
    });

    return Review;
}
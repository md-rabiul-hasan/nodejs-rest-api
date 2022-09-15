module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define({
        name : {
            type : Sequelize.STRING,
        }
    });
    return Role;
};
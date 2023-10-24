const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Temperaments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNll: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNll: false
        },
    }, {timestamps: false});
};
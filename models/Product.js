'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsToMany(models.Size, { through: 'product_size', timestamps: false, foreignKey: 'product_id', otherKey: 'size_id' })
        }
    }
    Product.init({
        name: {
            allowNull: false,
            type: DataTypes.STRING
        },
        model: {
            allowNull: false,
            type: DataTypes.STRING
        },
        price: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        code: {
            allowNull: false,
            type: DataTypes.INTEGER,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'product',
    });
    return Product;
};
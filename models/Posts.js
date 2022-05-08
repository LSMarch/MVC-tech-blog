const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

// title
// date created
// contents/description
// user
// leave comment??
Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,            
            primaryKey: true,
            autoIncrement: true,
            //defaultValue: null
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: true, 
        freezeTableName: true,
        modelName: 'posts'
    }
)

module.exports = Posts
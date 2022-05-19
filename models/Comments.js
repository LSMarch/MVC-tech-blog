const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        commentText: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,140]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        posts_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'posts',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'comments'
    }
)

module.exports = Comments;
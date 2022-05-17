const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Users extends Model {
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password);
    };
};

Users.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [8]
            }
        },
    },
    {
        hooks:{
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'users'
    }
);

module.exports = Users
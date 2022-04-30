const { Model, DataTypes } = require('sequelize');
const bcrypt = require ('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPass) {
        // loading password from db, comparing to user input, returning password/allow login if true
        return bcrypt.compareSync(loginPass, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            },
        },
    },
    {
        hooks: {
            // before new user is created, grab user password, hash it, then return it.
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
        },
        sequelize,
        timestamps: true,
        freezeTableName: true,
        modelName: 'user',
    },    
)
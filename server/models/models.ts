const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Gallery = sequelize.define('gallery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Public = sequelize.define('public', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Private = sequelize.define('private', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
})

const Video = sequelize.define('video', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    movie: {type: DataTypes.STRING, allowNull: false}
})


User.hasOne(Gallery)
Gallery.belongsTo(User)

Gallery.hasOne(Public)
Public.belongsTo(Gallery)

Gallery.hasOne(Private)
Private.belongsTo(Gallery)

Public.hasMany(Video)
Video.belongsTo(Public)

Private.hasMany(Video)
Video.belongsTo(Private)


module.exports = {
    User,
    Gallery,
    Public,
    Private,
    Video
}

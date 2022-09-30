require('dotenv').config() // dotenv for reading dir
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const PORT = process.env.PORT || 5000
const app = express()


const start = async () => {
    try {
        await sequelize.authenticate() // подключение к бд
        await sequelize.sync() // сверяет состояние базы данных со схемой данных
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} PORT`))
    } catch (e){
        console.log(e)
    }
}

start()
export {};
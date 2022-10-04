require('dotenv').config() // dotenv for reading dir
import { Request, Response } from 'express'
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api',router)


//
app.use(errorHandler)

app.get('/', (req: Request,res: Response) => {
    res.status(200).json({message: 'ALL WORKING'})
})

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
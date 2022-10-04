const ApiError = require('../error/ApiError')
import {NextFunction, Request, Response} from 'express'
const bcrypt = require('bcrypt') // хэширование паролей, чтобы не хранить их  в открытом виде
const jwt = require('jsonwebtoken')
const {User, Gallery} = require('../models/models')

const generateJWT = (id: number, email: string, role: string) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECTRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req: Request, res: Response, next: NextFunction){
        const {email, password, role} = req.body
        if (!email || !password){
            return next(ApiError.badRequest('Некорректный email or password'))
        }
        const canditade = await User.findOne({where: {email}})
        if (canditade){
            return next(ApiError.badRequest('Пользователь уже зарегистрирован'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const gallery = await Gallery.create({userId: user.id})
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }
    async login(req: Request,res: Response, next: NextFunction){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal('Неверный пароль'))
        }
        const token = generateJWT(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req: Request,res: Response, next: NextFunction){
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async delete(req: Request,res: Response, next: NextFunction){
        const {id} = req.params
        const user_del = await User.removeAttribute({where: {id}})
        return res.json(user_del)
    }
}
module.exports = new UserController() // обращение через точку к объектам
export {};
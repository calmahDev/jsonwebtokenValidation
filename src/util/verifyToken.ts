import { Request,response,NextFunction } from "express"
import jwt from 'jsonwebtoken'

interface IPayload{
    _id : string;
    iat : number;
}

export const tokenValidation= (req:Request, res:Request, next:NextFunction)=>{
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access denied')

    const payload = jwt.verify(token,process.env['TOKEN_SECRET']||'tokentest') as IPayload
    req.userId=payload._id
    next()
}


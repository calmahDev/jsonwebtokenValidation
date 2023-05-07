import { Request, Response } from "express"
import User, {IUser} from "../model/User"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()


// resgiter
export const signup = async (req:Request,res:Response)=>{
    // saving user
    const user: IUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    })
    user.password = await user.encryptPassword(user.password);
    const saveUser=await user.save()    

    //create token (_id: se autogenera no existe en el codigo pero se genera al ejecutar por eso marca error)
    
    const token: string = jwt.sign( { id: user._id} , process.env.TOKEN_SECRET || "tokentest" )
    res.header('auth-token', token).json(user)

}

// loging
export const signin = async (req:Request,res:Response)=>{
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json('Email or Password is wrong');
    const correctPassword = await user.validatePassword(req.body.password);
    if (!correctPassword) return res.status(400).json('Invalid Password');

    // Create a Token
    const token: string = jwt.sign({ _id: user._id }, process.env['TOKEN_SECRET'] || '');
    res.header('auth-token', token).json(token);
}

// form dates
export const profile = async (req:Request,res:Response)=>{
    const user=await User.findById(req.userId,{password:0})
    if(!user) return res.status(404).json('No User Founnd ')
    res.json(user)   
}

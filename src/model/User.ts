import {Schema,model} from "mongoose";
import bcrypt from 'bcryptjs'
export interface IUser{
    username:string;
    email:string;
    password:string;
    encryptPassword(password:string) : Promise<string>
    validatePassword(password:string) : Promise<boolean>
}

const userSchema=new Schema ({
    username:{
        type:String,
        required:true,
        min: 4,
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase: true
    },
    password:{
        type:String,
        require:true
    }
})

userSchema.methods.encryptPassword = async (password:string) : Promise<string>=>{
   const salt = await bcrypt.genSalt(10)
   return bcrypt.hash(password, salt)
}
userSchema.methods.validatePassword = async function ( password:string ) : Promise<boolean> {
    return await bcrypt.compare( password, this.password)
} 
export default model<IUser>('User',userSchema)
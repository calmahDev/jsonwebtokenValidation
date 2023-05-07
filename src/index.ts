import dotenv from 'dotenv'
import { app } from "./app";
import  "./database/database"


dotenv.config()
console.log(process.env.TESTING)

export const main = ()=>{
    app.listen(app.get('port'));
    console.log("lintening on port ",app.get('port'));
}

main()
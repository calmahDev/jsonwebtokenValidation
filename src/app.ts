import morgan from 'morgan'
import express,{Application} from "express";
import authRoutes from './routes/auth'
 
// settings
export const app : Application =express()

// middleware
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/auth',authRoutes)

app.set ('port',4000);
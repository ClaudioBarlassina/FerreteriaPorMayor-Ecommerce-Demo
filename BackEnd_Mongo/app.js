import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import productosRoutes from './routes/productos.routes.js'
import { connectDB } from './config/mongo.js'
import paymentRoutes from "./routes/payment.routes.js"; 




const app = express()
app.use(cors());
app.use(express.json())

connectDB()

app.use('/api/productos', productosRoutes)
app.use( "/api/payment",paymentRoutes)

app.listen(3000, () => console.log('🚀 Server corriendo'))

import express from 'express'
import dotenv from 'dotenv'
import connectDB from './utils/connectDB.js'
import productRoute from './Routes/products.js'
import userRoute from './Routes/user.js'
import cors from 'cors'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config()
const app = express()

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.resolve(__dirname, './client/build')))


app.use(cors())
app.use(express.json())



app.use('/api/v1/products', productRoute)
app.use('/api/v1/user', userRoute)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})
app.all('*', (req, res, next) => {
    const err = new AppError(`Cannot find ${req.originalUrl} on this server`, 404)
    next(err)
})


app.use(globalErrorHandler)
const port = process.env.PORT || 5000


const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        const server = app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log('Unhandled Rejection')

    }
}
start()

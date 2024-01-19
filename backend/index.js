import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import bookRoute from "./routes/bookRoute.js";

const app = express()
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))
app.use(express.json())
app.use('/books', bookRoute)
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })
import express from "express";
import { PORT, mongodbUrl } from './config.js'
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import playlistRoutes from './routes/playlistRoutes.js'
import songRoutes from './routes/songRoutes.js'
import historyRoutes from './routes/historyRoutes.js'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    //console.log(req)
    return res.status(234).send("welcome")
});


app.use('/users',userRoutes)
app.use('/playlist',playlistRoutes)
app.use('/songs', songRoutes)
app.use('/history',historyRoutes)

mongoose.connect(mongodbUrl)
    .then(() => {
        console.log("db connection was successful")
        app.listen(PORT, () => {
            console.log("server is listening");
        })

    })
    .catch((error) => {
        console.log(error)
    })
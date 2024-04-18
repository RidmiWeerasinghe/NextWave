import express, { json, request, response } from "express";
import { PORT, mongodbUrl } from './config.js'
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js"
import cors from 'cors'
import { User } from "./model/userModel.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("welcome")
});

app.post('/login', (req, res)=>{
    const {email, password} = req.body
    User.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("success")
            }
            else{
                res.json("Incorrect password")
            }
        }
        else{
            res.json("User doesn't exists")
        }
    })
})

app.post('/email', async (req, res) => {
    const {email} = req.body
    console.log(email)
    User.findOne({email: email})
    .then(user => {
        console.log(user)
        if(user){
            res.json("User already exists")
        }
        else{
            res.json("ok")
        }
    })
    
})

app.use('/users',userRoutes)

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
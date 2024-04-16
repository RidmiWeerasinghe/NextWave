import express, { response } from "express";
import { PORT, mongodbUrl } from './config.js'
import mongoose from "mongoose";
import { User } from "./model/userModel.js";

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("welcome")
});

app.post('/register', async(req,res)=>{
    try{
        if(
            !req.body.username ||
            !req.body.password ||
            !req.body.email
        ){
            return res.status(400).send({
                message:'send all required fields'
            });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };
         const user = await User.create(newUser);
         return res.status(201).send(user);
    }
    catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message})
    }
})

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
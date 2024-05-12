import express from 'express'
import { User } from '../model/userModel.js'

const router = express.Router();

//registering a user
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.username ||
            !req.body.password ||
            !req.body.email
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            });
        }
        const newUser = {
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            imageUrl: null
        }
        console.log(newUser)
        const user = await User.create(newUser)
        return res.status(201).send(user)
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send({ message: error.message })
    }
})

//check if user exists
router.post('/email', async (req, res) => {
    const { email } = req.body
    User.findOne({ email: email })
        .then(user => {
            //console.log(user)
            if (user) {
                res.json("User already exists")
            }
            else {
                res.json("ok")
            }
        })

})

//get user
router.get('/get/:email', async (req, res) => {
    const { email } = req.params
    await User.findOne({ email: email })
        .then(user => {
            //console.log(user)
            if (user) {
                res.json({
                    user: user
                })
            }
            else {
                res.json("no user")
            }
        })

})

//user login
router.post('/login', (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json({
                        status: "success",
                        user: user
                    })
                }
                else {
                    res.json({
                        status: "Incorrect password"
                    })
                }
            }
            else {
                res.json({
                    status: "User doesn't exists"
                })
            }
        })
})

//retrieving all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//update user
router.put('/update/:email', async (req, res) => {
    try {
        const { email } = req.params
        const {username, password, imageUrl} = req.body

        const user = await User.findOne({ email })
        if (user) {
            user.username = username
            user.email = email
            user.password = password
            user.imageUrl = imageUrl
            await user.save()
            return res.status(200).send({ message: "user updated successfully" })
        }
        else {
            res.status(500).send({ message: "user not found" })
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

//delete user
router.delete('/delete/:email', async (req, res) => {
    try {
        const { email } = req.params
        const result = await User.findOneAndDelete({email})

        if (!result) {
            res.status(500).send({ message: "user not found" })
        }

        return res.status(200).send({ message: "deleted successfully" })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
})

export default router
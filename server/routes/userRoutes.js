import express from 'express'
import {User} from '../model/userModel.js'

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
            email: req.body.email
        };
        const user = await User.create(newUser);
        return res.status(201).send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

//retrieving whole users
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


//getting user by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const user = await User.findById(id);
        return response.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//update user
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.username ||
            !request.body.password ||
            !request.body.email
        ) {
            return res.status(400).send({
                message: 'send all required fields'
            });
        }

        const { id } = request.params;

        const result = await User.findByIdAndUpdate(id, request.body);
        if (!result) {
            response.status(500).send({ message: "user not found" });
        }
        return response.status(200).send({ message: "user updated successfully" });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//delete user
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await User.findByIdAndDelete(id)

        if (!result) {
            response.status(500).send({ message: "user not found" });
        }

        return response.status(200).send({ message: "deleted successfully" })
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router;
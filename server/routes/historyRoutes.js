import express from 'express'
import { History } from '../model/historyModel.js'

const router = express.Router()

//check history
router.post('/check', async (req, res) => {
    const { email } = req.body
    try {
        History.findOne({ email: email })
            .then(async user => {
                //console.log(user)
                if (!user) {
                    const newHistory = {
                        email: req.body.email,
                        tracks: []
                    }
                    const history = await History.create(newHistory)
                    return res.status(201).send(history)
                }
                else {
                    res.status(200).json("ok")
                }
            })
    } catch (error) {
        console.log(error)
    }
})

router.post('/add', async (req, res) => {
    const { email, trackID } = req.body
    try {
        const user = await History.findOne({ email: email })
        if (user) {
            const isUpdated = await History.findOneAndUpdate(
                { email: email },
                { $push: { "tracks": { trackID: trackID } } },
                { new: true }
            )

            if (!isUpdated) {
                return res.status(500).send({ message: "Could not add to history" })
            } else {
                return res.status(200).send({ message: "Added to history successfully", data: isUpdated })
            }
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

//get history
router.get('/recent/:email', async (req, res)=>{
    const { email } = req.params
    try {
        const user = await History.findOne({ email: email })
        if (user) {
            console.log(user)
            return res.status(200).send({ message: "user history", data: {tracks :user.tracks, count:user.tracks.length}})
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

//clear history
router.delete('/clear/:email', async (req, res)=>{
    const { email} = req.params
    console.log(email)
    try {
        const user = await History.findOne({ email: email })
        if (user) {
            //console.log(user.tracks.length)
            let count = user.tracks.length
            user.tracks.splice(0,count)
            await user.save()
            return res.status(200).send({ message: "History deleted successfully" , data: user})
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})
export default router
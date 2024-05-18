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

//add to history
router.post('/add', async (req, res) => {
    const { email, trackID , name, artist} = req.body

    try {
        const user = await History.findOne({ email: email })

        if (user) {
            //the track already exists
            const trackIndex = user.tracks.findIndex(track => track.trackID === trackID)

            // Track exists
            if (trackIndex !== -1) {
                //update count
                const track = user.tracks[trackIndex]
                track.count += 1

                // Remove the track from the current position
                user.tracks.splice(trackIndex, 1)

                // Add the track to the front
                user.tracks.unshift(track)

            // Track does not exist
            } else {
                //add new track
                user.tracks.unshift({ trackID: trackID, count: 1 , name: name, artist: artist})
            }

            // Save the updated user document
            await user.save()

            return res.status(200).send({ message: "Added to history successfully", data: user })
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

//get most played 10 songs
router.get('/mostplayed/:email', async (req, res) => {
    const { email } = req.params

    try {
        const user = await History.findOne({ email: email })

        if (user) {
            // Sort tracks by count in descending order and get the top 5
            let mostPlayedTracks = user.tracks.sort((a, b) => b.count - a.count)

            if(mostPlayedTracks.length > 15){
                mostPlayedTracks = mostPlayedTracks.splice(0,15)
            }

            return res.status(200).send({ message: "Most played tracks retrieved successfully", data: mostPlayedTracks })
        } else {
            return res.status(404).send({ message: "User not found" })
        }
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
});


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

//deleting user
router.delete('/delete/:email', async (req, res) =>{
    const {email} = req.params

    try {
        const userHistory = await History.findOneAndDelete({email})
        if(userHistory){
            res.status(200).send({message:"user history deleted successfully"})
        }
        else{
            res.status(500).send({ message: "user not found" })
        }
    } catch (error) {
        
    }
})
export default router
import express, { json } from 'express'
import { User } from '../model/userModel.js'

const router = express.Router();

//adding a new playlist
router.post('/createplaylist', async (req, res) => {
    const playlistData = {
        name: req.body.name,
        songs: []
    }
    try {
        const result = await User.findOneAndUpdate({ email: req.body.email }, { $push: { playlist: playlistData } })
        if (!result) {
            response.status(500).send({ message: "user not found" });
        }
        return res.status(200).send({ message: "Playlist created" });
    } catch (error) {
        console.log(error.message)
    }
})

//finding a playlist
router.post('/findPlaylist', async (req, res) => {
    //console.log(req.body)
    //find user
    try {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    //console.log("found user")
                    //find if the user already has a playlist by same name
                    const playlistExists = user.playlist.some(playlist => playlist.name === req.body.playlist.name);
                    if (playlistExists) {
                        res.status(201).json("User already has a playlist with the same name")
                    } else {
                        res.status(200).json("User does not have a playlist with the same name")
                    }
                }
                else {
                    res.json("couldn't find user")
                }
            })
    } catch (error) {
        console.log(error.message)
    }
})

//getting all playlists
router.get('/getallplaylist/:email', async (req, res) => {
    const {email} = req.params
    try {
        const user = await User.findOne({ email })
        if (user) {
           return res.status(200).json({
            count: user.playlist.length,
            data: user.playlist
           })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export default router
import express from 'express'
import { User } from '../model/userModel.js'

const router = express.Router()

router.get('/getplaylistsongs/:email/:name', async (req, res) => {
    const { email } = req.params
    try {
        const user = await User.findOne({ email })
        //user exists
        if (user) {
            console.log(user.playlist)
            //playlist exists
            try {
                const playlistIndex = user.playlist.findIndex(playlist => playlist.name === req.params.name)
                
                if (playlistIndex !== -1) {
                    res.json(user.playlist[playlistIndex])
                }
                else {
                    res.json("playlist not found")
                }

            } catch (error) {
                console.log(error.message)
            }
        }
        //user doesn't exists
        else {
            res.json("user not found")
        }
    } catch (error) {
        console.log(error.message)
    }
})

export default router
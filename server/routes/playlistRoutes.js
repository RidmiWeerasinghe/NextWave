import express, { json } from 'express'
import { User } from '../model/userModel.js'

const router = express.Router()

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
    console.log(req.body)
    //find user
    //console.log(req.body)
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
    const { email } = req.params
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

//update the name of playlist
router.put('/updatename/:email', async (req, res) => {
    const { email } = req.params
    const { playlistname, newName } = req.body
    try {
        const user = await User.findOne({ email })
        if (user) {
            try {
                //finging the index of playlist
                const playlistIndex = user.playlist.findIndex(playlist => playlist.name === playlistname)
                if (playlistIndex !== -1) {
                    user.playlist[playlistIndex].name = newName
                    await user.save()
                    res.json("updated")
                }
                else {
                    res.json("playlist not found")
                }

            } catch (error) {
                console.log(error.message)
            }
        } else {
            res.json("user not found")
        }
    } catch (error) {
        console.log(error.message)
    }
})

//delete a playlist
router.delete('/delete/:email', async (req, res) => {
    const { email } = req.params
    const { name } = req.body
    console.log(name)
    try {
        const user = await User.findOne({ email })
        if (user) {
            try {
                let i = 0
                while (user.playlist[i].name !== name) {
                    i++
                    if (!user.playlist[i]) {
                        i = -1
                        break
                    }
                }
                const playlistIndex = user.playlist.findIndex(playlist => playlist.name === name)
                console.log(playlistIndex)
                if (playlistIndex !== -1) {
                    user.playlist.splice(playlistIndex, 1)
                    await user.save()
                    res.json("deleted")
                }
                else {
                    res.status(404).json("playlist not found")
                }

            } catch (error) {
                console.log(error.message)
                res.status(500).json("Internal Server Error")
            }
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal Server Error")
    }
})

//get playlist by name
router.get('/getplaylist/:email/:name', async (req, res) => {
    const { name } = req.params
    const { email } = req.params

    try {
        const user = await User.findOne({ email })
        if (user) {
            console.log(user.playlist)
            const playlistIndex = user.playlist.findIndex(playlist => playlist.name == name)
            if (playlistIndex !== -1) {
                res.json(user.playlist[playlistIndex])
            }
            else {
                res.status(404).json("not found")
            }
        }
        //user doesnt exists
        else {
            res.status(404).json("user not found")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal Server Error")
    }
})

//pushing a song to a playlist
router.post('/addtoplaylist/:email/:name/:songid', async (req, res) => {
    const { email, name, songid } = req.params
    try {
        const user = await User.findOne({ email })
        if (user) {
            const playlistIndex = user.playlist.findIndex(playlist => playlist.name == name)
            if (playlistIndex !== -1) {

                const songIndex = user.playlist[playlistIndex].songs.findIndex(songs => songs.songID == songid)

                if (songIndex === -1) {
                    try {
                        const isUpdated = await User.findOneAndUpdate(
                            { email, "playlist.name": name },
                            { $push: { "playlist.$.songs": { songID: songid, isFavorite: false } } },
                            { new: true }
                        )
                        if (isUpdated) {
                            res.json("updated")
                        }
                        else {
                            res.json("fail")
                        }
                    } catch (error) {
                        console.log(error.message)
                    }
                }
                else {
                    res.status(404).json("Song already exists")
                }
            }
            else {
                res.status(404).json("not found")
            }
        }
        //user doesnt exists
        else {
            res.status(404).json("user not found")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal Server Errorrr")
    }
})

//removing a song from a playlist
router.delete('/removefromplalist/:email/:name/:songid', async (req, res) => {
    const { email, name, songid } = req.params

    try {
        const user = await User.findOne({ email })
        if (user) {
            const playlistIndex = user.playlist.findIndex(playlist => playlist.name == name)
            if (playlistIndex !== -1) {

                const songIndex = user.playlist[playlistIndex].songs.findIndex(songs => songs.songID == songid)

                if (songIndex !== -1) {
                    try {
                        user.playlist[playlistIndex].songs.splice(songIndex, 1)
                        await user.save()
                        res.json("deleted")
                    } catch (error) {
                        console.log(error.message)
                    }
                }
                else {
                    res.status(404).json("Song does not exists")
                }
            }
            else {
                res.status(404).json("playlist not found")
            }
        }
        //user doesnt exists
        else {
            res.status(404).json("user not found")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).json("Internal Server Errorrr")
    }
})


export default router
import express from 'express'
import { User } from '../model/userModel.js'
import { Google } from '@flytri/lyrics-finder'

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

//set favorite sts
router.put('/setfavorite/:songid', async (req, res) => {
    console.log("email")
    const { songid } = req.params
    const { email } = req.body

    try {
        const user = await User.findOne({ email })
        if (user) {
            if (user.favorites.length !== 0) {
                const songIndex = user.favorites.findIndex(favorites => favorites.songID == songid)
                console.log(songIndex)

                if (songIndex !== -1) {
                    user.favorites.splice(songIndex, 1)
                    await user.save()
                    res.status(200).json("removed")
                }
                else {
                    //add the song to favorites
                    user.favorites.push({ songID: songid })
                    await user.save()
                    res.status(200).json("added")
                }
            }
            else {
                //add the song to favorites
                user.favorites.push({ songID: songid });
                await user.save();
                res.json("added");
            }
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (error) {
        res.json(error.message)
    }
})

//get fav sts
router.get('/checkfavorite/:email/:songid', async (req, res) => {
    const { songid, email } = req.params
    try {
        const user = await User.findOne({ email })
        if (user) {
            if (user.favorites.length !== 0) {
                const songIndex = user.favorites.findIndex(favorites => favorites.songID == songid)
                console.log(songIndex)

                if (songIndex !== -1) {
                    res.json("true")
                }
                else {
                    res.json("false")
                }
            }
            else {
                res.json("no favorite songs");
            }
        }
        else {
            res.status(404).json("user not found")
        }
    } catch (error) {
        res.json(error.message)
    }
})


//get all favourite songs
router.get('/getallfavourites/:email', async (req, res) => {
    const { email } = req.params

    const user = await User.findOne({ email })
    if (user) {
        if (user.favorites.length !== 0) {
            res.json({
                count: user.favorites.length,
                tracks: user.favorites
            })
        }
        else {
            res.json("no favorites")
        }
    }
    else {
        res.json("user not found")
    }
})


//getting lyrics
router.get('/lyrics', async (req, res) => {
    const artist = req.query.artist
    const track = req.query.track

    console.log(req.query.artist)
    console.log(req.query.track)

    //const lyrics = await lyricsFinder(artist, track) || "Lyrics Not Found"
    const response = await Google(track, "vi")
    .then(response => {
        console.log(response.lyrics)
        res.json({ lyrics : response.lyrics })
    })
    .catch(err =>{
        console.log(err)
        res.status(404).json("Lyrics Not found")
    })
})
export default router
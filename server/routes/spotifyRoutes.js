import express, { json } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import { SPOTIFY_CLIENT_Id, SPOTIFY_CLIENT_SCECRET } from '../config.js'

const router = express.Router()

router.get('/accesstoken/:code', async (req, res) => {

    const {code} = req.params
    console.log(code)

    //     const clientID = "72cdd5687f2146adaf6d90d7d3f95270"
    //     const clientSecret = "e521133ff90f4230885d2e1dc8d0fd11"
    //     const scopes = ["streaming", "user-read-email", "user-read-private"]

    //     try {
    //         var authParameters = {
    //             method: 'POST',
    //             headers: {
    //                 'Authorization': 'Basic ' + (Buffer.from(clientID + ':' + clientSecret).toString('base64')),
    //                 "Content-Type": "application/x-www-form-urlencoded"
    //             },
    //             body: "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret + "&scope=" + scopes.join("%20")
    //         }
    //         fetch("https://accounts.spotify.com/api/token", authParameters)
    //             .then(result => result.json())
    //             .then(data => {
    //                 console.log(data)
    //                 res.json(data.access_token)
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }

    
        const spotifyApi = new SpotifyWebApi({
            redirectUri: "http://localhost:5173/callback",
            clientId: SPOTIFY_CLIENT_Id,
            clientSecret: SPOTIFY_CLIENT_SCECRET,
        })
        spotifyApi
            .authorizationCodeGrant(code)
            .then(data => {
                // console.log(data)
                res.json(data.body.access_token)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
})

export default router
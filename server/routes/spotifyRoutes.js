import express, { json } from 'express'
import SpotifyWebApi from 'spotify-web-api-node'

const router = express.Router()

router.get('/accesstoken/:code', async (req, res) => {

    //res.json("BQDnMiU2E_MylPykM8Ru8PeeazAt5x8pqMX2-SZcWw9Fr0P-rOk6_bimdE5uUJT2HcHFlOIFeAjtLKYrXrGNie8VDON0cR16U9Q5fnHBBDpJ5OiYMLzmzHxNqEcuVWKUNxsnBFqQzWvSnNmZKKlNyxirlgwqaZ2KgC5bWBb-CYFNldahQkpuQo3tEVdo3_Tal-kpUDFDi6sLqnf65aigO0cxMcbWYlc0")

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
            clientId: "72cdd5687f2146adaf6d90d7d3f95270",
            clientSecret: "e521133ff90f4230885d2e1dc8d0fd11",
        })
        spotifyApi
            .authorizationCodeGrant(code)
            .then(data => {
                // console.log("ccccccccccc")
                // console.log(data)
                res.json(data.body.access_token)
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(400)
            })
})

export default router
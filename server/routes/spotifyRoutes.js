import express, { json } from 'express'

const router = express.Router()

router.get('/accesstoken', async (req, res) => {

    //res.json("BQAEPn0b9rohvTkq1Vy1xtNJcW-EPGMMv2BCD7PSIVcr9HHZSKUEghUPMYGX_vid4oMMpt5EiEOColz63zKYqWyVah6hGcSou_p19mrGU0AMxZALsIb11gVD0sIAvS9lFfsORVk")

    const clientID = "72cdd5687f2146adaf6d90d7d3f95270"
    const clientSecret = "e521133ff90f4230885d2e1dc8d0fd11"
    const scopes = ["streaming", "user-read-email", "user-read-private"]

    try {
        var authParameters = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(clientID + ':' + clientSecret).toString('base64')),
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret + "&scope=" + scopes.join("%20")
        }
        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then(result => result.json())
            .then(data => {
                console.log(data)
                res.json(data.access_token)
            })
    } catch (error) {
        console.log(error)
    }
})

export default router
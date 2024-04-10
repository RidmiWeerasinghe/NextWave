import React, { useEffect, useState } from 'react'

function Home() {
    const [accessToken, setAccessToken] = useState("")
    const clientID = "72cdd5687f2146adaf6d90d7d3f95270"
    const clientSecret = "e521133ff90f4230885d2e1dc8d0fd11"

    useEffect(()=>{
        var authParameters = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body : "grant_type=client_credentials&client_id="+clientID+"&client_secret="+clientSecret
        }
        fetch("https://accounts.spotify.com/api/token",authParameters)
        .then(result => result.json())
        .then(data => setAccessToken(data.access_token))
    },[])
    return (
        <div className='bg-sky-400'>{accessToken}</div>
    )
}

export default Home

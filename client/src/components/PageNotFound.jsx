import React, { useEffect } from 'react'
import SinglePlaylist from './SinglePlaylist'
import Home from './Home'
import { useStateValue } from '../StateProvider'
import axios from 'axios'

function PageNotFound() {
    const [{ accessToken}, dispatch] = useStateValue()
    const code = new URLSearchParams(window.location.search).get("code")

    useEffect(()=>{
        axios.get(`http://localhost:5555/spotify/accesstoken/${code}`)
        .then(response => {
            dispatch({
                type: 'SET_TOKEN',
                accessToken: response.data
            })
            console.log("response.data")
            console.log(response.data)
        })
    },[])
    
    return (

        accessToken ? <SinglePlaylist /> : <Home />
    )
}

export default PageNotFound

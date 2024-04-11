import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import MusicCard from './MusicCard'
import { Link } from 'react-router-dom'

function Home() {
    const [accessToken, setAccess_Token] = useState("")
    const [trendingAlbums, setTrendingAlbums] = useState([])
    const [topAlbums, setTopAlbums] = useState([])
    const clientID = "72cdd5687f2146adaf6d90d7d3f95270"
    const clientSecret = "e521133ff90f4230885d2e1dc8d0fd11"

    // console.log("accessToken" + accessToken)
    // console.log("trendingAlbums" + trendingAlbums)

    useEffect(() => {
        //console.log("useeffect running ")

        var authParameters = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret
        }
        fetch("https://accounts.spotify.com/api/token", authParameters)
            .then(result => result.json())
            .then(data => setAccess_Token(data.access_token))
    }, [])

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        //console.log("useeffect running ")

        spotify.getArtistAlbums('63yrD80RY3RNEM2YDpUpO8').then(
            function (data) {
                console.log('Artist albums', data.items);
                setTrendingAlbums(data.items)
            },
            function (err) {
                console.error(err);
            }
        );

        spotify.getArtistAlbums('00FQb4jTyendYWaN8pK0wa').then(
            function (data) {
                console.log('Artist albums', data.items);
                setTopAlbums(data.items)
            },
            function (err) {
                console.error(err);
            }
        );
    }, [])


    return (
        <div className="bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
            <section className="w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Trending
                </h1>
                <div className="flex gap-6 overflow-scroll h-full">
                    {trendingAlbums.map((item) => (
                        <MusicCard album={item} id={item.id} />
                    ))}
                </div>
            </section >
            <section className="w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Top Albums of all the time
                </h1>
                <div className="flex gap-6 overflow-scroll h-full">
                    {topAlbums.map((item) => (
                        <MusicCard album={item} key={item.id} />
                    ))}
                </div>
            </section >
        </div >
    )
}

export default Home

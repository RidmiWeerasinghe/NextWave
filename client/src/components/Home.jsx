import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import MusicCard from './MusicCard'
import { useStateValue } from '../StateProvider'

function Home() {
    const [{ accessToken, trendingAlbums, topAlbums }, dispatch] = useStateValue()

    const clientID = "72cdd5687f2146adaf6d90d7d3f95270"
    const clientSecret = "e521133ff90f4230885d2e1dc8d0fd11"

    //console.log("accessToken from context api : " + accessToken)

    useEffect(() => {
        //getting access token
        try {
            var authParameters = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=client_credentials&client_id=" + clientID + "&client_secret=" + clientSecret
            }
            fetch("https://accounts.spotify.com/api/token", authParameters)
                .then(result => result.json())
                .then(data => {
                   // if (data) {
                        //setIsLoading(false)
                        dispatch({
                            type: 'SET_TOKEN',
                            accessToken: data.access_token
                        })
                    //}
                })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        //console.log("useeffect running ")

        //getting trending albums
        spotify.getArtistAlbums('63yrD80RY3RNEM2YDpUpO8').then(
            function (data) {
                //console.log('Artist albums', data.items);
                dispatch({
                    type: 'SET_TRENDINGALBUMS',
                    trendingAlbums: data.items
                })
            },
            function (err) {
                console.error(err);
            }
        );

        //getting top albums
        spotify.getArtistAlbums('00FQb4jTyendYWaN8pK0wa').then(
            function (data) {
                dispatch({
                    type: 'SET_TOPALBUMS',
                    topAlbums: data.items
                })
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
                        <MusicCard album={item} key={item.id} />
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

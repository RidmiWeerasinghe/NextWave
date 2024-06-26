import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import MusicCard from './MusicCard'
import { useStateValue } from '../StateProvider'
import Player from './Player'

function Home() {
    const [{ accessToken, trendingAlbums, topAlbums, hidePlayer }, dispatch] = useStateValue()


    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {

        console.log("use effect running")
        //getting trending albums
        if (accessToken) {
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
        }
        else {
            console.log("no access token")
        }
    }, [])
    console.log(trendingAlbums)

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 h-full overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue" style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }} >
            <section className="w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-6">
                    Top Albums of all the time
                </h1>
                <div className="flex flex-wrap justify-between gap-8 overflow-scroll h-full mr-4">
                    {topAlbums.map((item) => (
                        <MusicCard album={item} key={item.id} />
                    ))}
                </div>
            </section >
        </div >
    )
}

export default Home

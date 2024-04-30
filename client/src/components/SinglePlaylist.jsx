import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import SpotifyWebApi from 'spotify-web-api-js'
import AlbumSongList from './AlbumSongLists'

function SinglePlaylist() {
    const [{ accessToken, currentPlaylistsSpotify, searchResultsLoading }, dispatch] = useStateValue()

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
    console.log(currentPlaylistsSpotify)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        if (accessToken) {
            spotify.getPlaylist("37i9dQZF1DXcBWIGoYBM5M")
                .then(function (data) {
                    console.log(data)
                    dispatch({
                        type: 'SET_CURRENTPLAYLISTSPOTIFY',
                        currentPlaylistsSpotify: data
                    })
                }, function (err) {
                    console.error(err)
                })
        }
    }, [])

    console.log(currentPlaylistsSpotify)
    return (
        <div className={"bg-darkBlue  overflow-hidden "}>
            {!searchResultsLoading && <div className={"bg-darkBlue  overflow-hidden "}>
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                    <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                        <img className="w-60 h-60 rounded-lg" src={currentPlaylistsSpotify.images[0].url} />

                        <div className="flex place-content-center max-md:place-items-center flex-col">
                            <h2
                                className="font-bold text-4xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                                dangerouslySetInnerHTML={{
                                    __html: `${currentPlaylistsSpotify.name}`,
                                }}
                            />
                            <p
                                className="text-slate-200 text-sm max-md:text-xs max-md:text-center mt-3 ml-2"
                                dangerouslySetInnerHTML={{
                                    __html: `${currentPlaylistsSpotify.description}`,
                                }}
                            />

                        </div>
                    </div>
                </div>
                <section className="mx-12 mb-10 mt-6 max-md:mx-2">
                    {currentPlaylistsSpotify?.tracks.items.map((track) => (
                        <AlbumSongList key={track.track.id} trackID={track.track.id} />
                    ))}
                </section>
            </div>}
            {searchResultsLoading &&
                <div className="overflow-auto py-6  px-9 max-md:px-1">
                    <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                        search results loading.....
                    </h3>
                </div>
            }
        </div>
    )
}

export default SinglePlaylist
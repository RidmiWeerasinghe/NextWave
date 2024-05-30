import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import SpotifyWebApi from 'spotify-web-api-js'
import AlbumSongList from './AlbumSongLists'
import axios from 'axios'

function SinglePlaylist() {
    const [{ accessToken, currentPlaylistsSpotify, searchResultsLoading }, dispatch] = useStateValue()

    console.log("searchResultsLoading: "+ searchResultsLoading)

    window.history.pushState({}, null, '/')
    //console.log(currentPlaylistsSpotify)

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
        <div className="bg-darkBlue  overflow-hidden mb-28 h-screen">
            <div className="bg-darkBlue  overflow-hidden h-full">
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7">
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
                <section className=" pr-2 mx-12 mb-10 mt-6 max-md:mx-2 overflow-y-scroll h-96 scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue">
                    {currentPlaylistsSpotify?.tracks.items.slice(0, 10).map((track) => (
                        <AlbumSongList key={track.track.id} trackID={track.track.id}/>
                    ))}
                </section>
            </div>
            {/* {searchResultsLoading &&
                <div className="overflow-auto py-6  px-9 max-md:px-1">
                    <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                        search results loading.....
                    </h3>
                    <img
                        src="/images/spinner.gif"
                        className='w-6 ml-2'
                        alt="Loading spinner"
                    />
                </div>
            } */}
        </div>
    )
}

export default SinglePlaylist
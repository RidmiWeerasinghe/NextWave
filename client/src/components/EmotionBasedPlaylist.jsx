import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import SpotifyWebApi from 'spotify-web-api-js'
import AlbumSongList from './AlbumSongLists'
import axios from 'axios'
import { playlistFromApi } from '../dummyData/dummy'
import { Toaster } from 'react-hot-toast'

function EmotionBasedPlaylist() {
    const [{ accessToken, hidePlayer }, dispatch] = useStateValue()
    const [moodPlaylist, setMoodPlaylist]  = useState(playlistFromApi)
    const playlistID = useParams()
    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        if (accessToken) {
            spotify.getPlaylist(playlistID.id)
                .then(function (data) {
                    console.log(data)
                    setMoodPlaylist(data)
                }, function (err) {
                    console.error(err)
                })
        }
    }, [])

    console.log("playlistID")
    console.log(playlistID.id)
    return (
        <div className={"bg-darkBlue  overflow-hidden"}>
            <Toaster/>
            <div className={"bg-darkBlue  overflow-hidden "}>
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                    <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                        <img className="w-60 h-60 rounded-lg" src={moodPlaylist.images[0].url} />

                        <div className="flex place-content-center max-md:place-items-center flex-col">
                            <h2
                                className="font-bold text-4xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                                dangerouslySetInnerHTML={{
                                    __html: `${moodPlaylist.name}`,
                                }}
                            />
                            <p
                                className="text-slate-200 text-sm max-md:text-xs max-md:text-center mt-3 ml-2"
                                dangerouslySetInnerHTML={{
                                    __html: `${moodPlaylist.description}`,
                                }}
                            />

                        </div>
                    </div>
                </div>
                <section className={`${hidePlayer ? "mb-5" : "mb-24"} mx-12 mb-10 mt-6 max-md:mx-2 h-96 overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue`} >
                    {moodPlaylist?.tracks.items.slice(0, 10).map((track) => (
                        <AlbumSongList key={track.track.id} trackID={track.track.id} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default EmotionBasedPlaylist
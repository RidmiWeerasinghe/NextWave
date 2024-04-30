import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import PlaylistCardV2 from './PlaylistCardv2'
import { playlistFromApi } from '../dummyData/dummy'

function TopPlaylists() {
    const [{ accessToken, currentPlaylistsSpotify }, dispatch] = useStateValue()
    const [playlists, setPlaylists] = useState(playlistFromApi)

    const playlistIDs = ['37i9dQZF1DXcBWIGoYBM5M', '37i9dQZF1DX4o1oenSJRJd',]
    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        if (accessToken) {
            spotify.getPlaylist(`37i9dQZF1DXcBWIGoYBM5M`)
                .then(function (data) {
                    console.log(data)
                    dispatch({
                        type: 'SET_CURRENTPLAYLISTSPOTIFY',
                        currentPlaylistsSpotify: data
                    })
                    setPlaylists(data)
                }, function (err) {
                    console.error(err)
                })
        }
    }, [])

    //console.log('currentPlaylistsSpotify')
    //console.log(currentPlaylistsSpotify)
    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
            <section className=" w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Top Playlists
                </h1>
                <div >
                    {<PlaylistCardV2 playlist={currentPlaylistsSpotify} key={currentPlaylistsSpotify.id} />}
                </div>
            </section >
        </div >
    )
}

export default TopPlaylists

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AlbumSongLists from './AlbumSongLists'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { userSelectedPlaylist } from '../dummyData/dummy'
import { Toaster } from 'react-hot-toast'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'

function UserSinglePlaylist() {
    const [{ user, pageRefresh, currentPlayingTrackId, accessToken }, dispatch] = useStateValue()
    const playlistName = useParams()
    const [playlist, setPlaylist] = useState(userSelectedPlaylist)

    // console.log("playlist")
    console.log(playlist)

    useEffect(() => {
        try {
            axios.get(`http://localhost:5555/playlist/getplaylist/${user.email}/${playlistName.name}`)
                .then(responce => {
                    setPlaylist(responce.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }, [pageRefresh])


    //playing a entire playlist
    const playPlaylist = () => {

        let trackIDs = playlist.songs?.map(song => song.songID) || []
        console.log(trackIDs)
        dispatch({
            type: 'SET_CURRENTPLAYINGTRACKID',
            currentPlayingTrackId: trackIDs
        })

        let trackUris = []

        for (let i = 0; i < trackIDs.length; i++) {
            try {
                var authParameters = {
                    method: 'GET',
                    mode: "cors",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
                fetch(`https://api.spotify.com/v1/tracks/${trackIDs[i]}`, authParameters)
                    .then(result => result.json())
                    .then(data => {
                        //if there isn't an error
                        if (data.album) {
                            //adding uris to array
                            trackUris.push(data.uri)
                            
                        }
                    }
                    )
                    .catch((error) => {
                        console.log(error)
                        console.log("error")
                    })
            } catch (error) {
                console.log(error)
            }
        }
        dispatch({
            type: 'SET_CURRENTPLAYINGTRACKURI',
            currentPlayingTrackUri: trackUris
        })

    }

    return (
        <div>
            <Toaster />
            <section className=" px-14 max-md:px-2 overflow-auto pb-8 pt-5">
                <section className="flex justify-between items-center ">
                    <h3 className="text-neutral-50  text-2xl flex items-center max-md:text-xl px-4 mb-5">
                        {playlistName.name}
                    </h3>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-xl px-4 mb-5'>
                        {playlist.songs.length} Songs
                    </p>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-xl px-4 mb-5 cursor-pointer' onClick={playPlaylist} >
                        <PlaylistPlayIcon className='text-lightTextColor' style={{ fontSize: 40 }} />
                    </p>
                </section>

                {playlist.songs.length > 0 && playlist.songs.map((song) => (
                    <AlbumSongLists key={song.songID} trackID={song.songID} removeBtnVisible={true} playlistName={playlist.name} />
                ))

                }

                {playlist.songs.length === 0 && (
                    <div className="w-full flex justify-center items-center mt-10">
                        <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                            You haven't added any song to this playlist yet.
                        </p>
                    </div>
                )}
            </section>

        </div>
    )
}

export default UserSinglePlaylist

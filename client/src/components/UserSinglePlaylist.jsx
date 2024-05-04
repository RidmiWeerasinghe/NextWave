import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AlbumSongLists from './AlbumSongLists'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import { userSelectedPlaylist } from '../dummyData/dummy'
import { Toaster } from 'react-hot-toast'
import Player from './Player'

function UserSinglePlaylist() {
    const [{ user, pageRefresh }, dispatch] = useStateValue()
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


    return (
        <div>
            <Toaster/>
            <section className=" px-14 max-md:px-2 overflow-auto pb-8 pt-5">
                <section className="flex justify-normal items-center pr-6">
                    <h3 className="text-neutral-50  text-2xl flex items-center max-md:text-xl px-4 mb-5">
                        {playlistName.name} 
                    </h3>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-xl px-4 mb-5'>
                        {playlist.songs.length} Songs
                        </p>
                </section>

                {playlist.songs.length > 0 && playlist.songs.map((song) => (
                    <AlbumSongLists key={song.songID} trackID={song.songID} removeBtnVisible={true} playlistName={playlist.name}/>
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

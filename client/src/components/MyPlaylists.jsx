import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import ListItemButton from '@mui/material/ListItemButton'
import AddIcon from '@mui/icons-material/Add'
import CreatePlaylistWindow from './CreatePlaylistWindow'
import PlaylistCard from './PlaylistCard'
import axios from 'axios'

function MyPlaylists() {
    const [{ user, showCreatePlaylistWindow, currentUserPlaylists, showEditPlaylistWindow, showDeletePlaylistWindow, hidePlayer}, dispatch] = useStateValue()

    //loading all playlists
    useEffect(() => {
        console.log("use effect running")
        axios.get(`http://localhost:5555/playlist/getallplaylist/${user.email}`)
            .then(response => {
                //console.log(response.data.data)
                dispatch({
                    type: 'SET_CURRENTUSERPLAYLIST',
                    currentUserPlaylists: response.data.data
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }, [showCreatePlaylistWindow, showEditPlaylistWindow, showDeletePlaylistWindow])


    const notLoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                Access to your playlists is only available to logged-in users. Please
                log in to view your playlists or try again later.
            </p>
        </div>
    )
    const LoggedInMessage = (
        <div className=" pl-7 mr-8 max-md:pl-2 mt-8 ">
            <div>
                <ListItemButton
                    className="flex gap-3 items-center"
                    sx={[{ borderRadius: 2 }]}
                    onClick={() => dispatch({
                        type: 'SET_SHOWCREATEPLAYLISTWINDOW',
                        showCreatePlaylistWindow: true
                    })}
                >
                    <div className="grid place-items-center bg-[#34343275] rounded-md p-2 scale-90">
                        <AddIcon className="text-neutral-200" />
                    </div>
                    <p className="text-neutral-300"> Create new playlist</p>
                </ListItemButton>
            </div>
            <section className="mt-8 flex flex-col mb-12">
                <h3 className="text-xl text-neutral-200 mb-2 pl-4 mt-4">
                    Your Playlists
                </h3>
                {(currentUserPlaylists.length < 0 || !currentUserPlaylists.length) ?
                    (<div className="w-full flex justify-center items-center mt-10">
                        <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                            You haven't created any playlist yet.
                        </p>
                    </div>) :
                    (<section className="mt-4 flex flex-col mb-12">
                        {currentUserPlaylists.map((playlist) => (
                            <PlaylistCard key={playlist.id} playlist={playlist} threedots={true} />
                        ))}
                    </section>)}
            </section>
            {showCreatePlaylistWindow && (
                <CreatePlaylistWindow />
            )}

        </div>
    )

    return (
        <div className=' overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue' style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}cd>
            {user.username ? LoggedInMessage : notLoggedInMessage}
        </div>
    )
}

export default MyPlaylists

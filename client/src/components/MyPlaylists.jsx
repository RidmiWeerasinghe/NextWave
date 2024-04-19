import React, { useState } from 'react'
import { useStateValue } from '../StateProvider'
import ListItemButton from '@mui/material/ListItemButton'
import AddIcon from '@mui/icons-material/Add'
import CreatePlaylistWindow from './CreatePlaylistWindow'

function MyPlaylists() {
    const [{ user }, dispatch] = useStateValue()
    const [showCreatePlaylistWindow, setCreatePlaylistWindow] = useState(false)

    const notLoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                Access to your playlists is only available to logged-in users. Please
                log in to view your playlists or try again later.
            </p>
        </div>
    )
    const LoggedInMessage = (
        <div className="overflow-auto pl-7 mr-8 max-md:pl-2 mt-8 ">
            <div>
                <ListItemButton
                    className="flex gap-3 items-center"
                    sx={[{ borderRadius: 2 }]}
                    onClick={() => setCreatePlaylistWindow(true)}
                >
                    <div className="grid place-items-center bg-[#34343275] rounded-md p-2 scale-90">
                        <AddIcon className="text-neutral-200" />
                    </div>
                    <p className="text-neutral-300"> Create new playlist</p>
                </ListItemButton>
            </div>
            <section className="mt-4 flex flex-col mb-12">
                <h3 className="text-xl text-neutral-200 mb-2 pl-4 mt-4">
                    Your Playlists
                </h3>
                <div className="w-full flex justify-center items-center mt-10">
                    <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                        You haven't created any playlist yet.
                    </p>
                </div>
            </section>
            {showCreatePlaylistWindow && (
                <div className='bg-white'>dsds</div>
            )}
        </div>)

    return (
        <div>
            {user.username ? LoggedInMessage : notLoggedInMessage}


        </div>
    )
}

export default MyPlaylists

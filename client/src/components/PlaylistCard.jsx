import React from 'react'
import { Link } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Popover from '@mui/material/Popover'
import ListItemButton from '@mui/material/ListItemButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MusicNoteIcon from '@mui/icons-material/MusicNote'

function PlaylistCard(playlist) {
    //console.log(playlist.playlist.songs.length)
    const handleClick = () =>{
        console.log("handle click")
    }
    const HandleRename = () => {
        console.log("handle click")
    }
    const HandleDeleteModal = () =>{
        console.log("handle click")
    }
    return (
        <div className="relative w-full">
            <Link
                to={`/`}
                className="hover:bg-lightBlue block  hover:bg-opacity-60 mr-3 transition-all duration-300 ease-linear py-[10px] rounded-md px-4"
            >
                <div className="flex overflow-hidden cursor-pointer   rounded-md items-center">
                    <div className="flex  w-full items-center gap-5 ">
                        <div className="grid place-items-center bg-[#343432] rounded-md p-2">
                                <MusicNoteIcon className="text-neutral-300" />
                            </div>
                        <div className="">
                            <h3 className="text-neutral-200 tracking-wide text-base">
                                {playlist.playlist.name}
                            </h3>
                            <p className="text-neutral-400 text-xs mt-1">
                                {playlist.playlist.songs.length} songs
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            <section
                className="absolute right-2 top-0 bottom-0 grid place-items-center   z-10"
                onClick={handleClick}
            >
                <IconButton size="large">
                    <MoreVertIcon className="text-neutral-400" />
                </IconButton>
            </section>
            
        </div>
    )
}

export default PlaylistCard

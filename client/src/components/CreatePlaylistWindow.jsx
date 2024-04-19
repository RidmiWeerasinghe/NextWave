import React from 'react'
import { ListItemButton } from '@mui/material'

function CreatePlaylistWindow() {
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black bg-opacity-30">

            <p className="text-neutral-200 text-base font-thin tracking-wider">
                Create New Playlist
            </p>
            <input
                type="text"
                autoFocus
                className="outline-none border-b font-thin tracking-wider text-sm border-neutral-400 py-1 text-neutral-200 bg-transparent"
            />
            <div className="flex justify-end gap-2 w-full mt-5">
                <ListItemButton
                    sx={[{ width: "fit-content", flexGrow: 0 }]}
                    onClick={() => console.log("clicked")}
                >
                    <button className="text-neutral-200 font-extralight tracking-wider text-sm">
                        cancel
                    </button>
                </ListItemButton>

                <button
                    className="text-neutral-200 font-extralight select-none text-sm  tracking-wider rounded-md bg-darkBlue px-4 py-2"
                >
                </button>
            </div>
        </div >
    )
}

export default CreatePlaylistWindow

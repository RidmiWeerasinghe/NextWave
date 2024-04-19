import React from 'react'
import { ListItemButton } from '@mui/material'
import { useStateValue } from '../StateProvider'

function CreatePlaylistWindow() {
    const [{ showCreatePlaylistWindow }, dispatch] = useStateValue()
    const handleCancle = () => {
        dispatch({
            type: 'SET_SHOWCREATEPLAYLISTWINDOW',
            showCreatePlaylistWindow: false
        })
    }
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black bg-opacity-30">
            <div className="relative w-[400px] bg-grayBackground rounded-lg shadow-lg">
                <div className="p-8">
                    <p className="text-neutral-200 text-base font-thin tracking-wider mb-4">
                        Create New Playlist
                    </p>
                    <input
                        type="text"
                        autoFocus
                        className="outline-none border-b font-thin tracking-wider text-sm border-neutral-400 py-1 text-neutral-200 bg-transparent mb-6 w-full"
                    />
                    <div className="flex justify-end gap-2">
                         <button className="text-neutral-200 font-extralight tracking-wider text-sm border border-lightTextColor rounded-md px-4 py-2" onClick={handleCancle}>
                                Cancel
                            </button>
                        <button
                            className="bg-lightTextColor hover:opacity-90 text-backgroundColor font-extralight select-none text-sm tracking-wider rounded-md px-4 py-2">
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylistWindow

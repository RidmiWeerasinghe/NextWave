import React, { useState } from 'react'
import { useStateValue } from '../StateProvider'
import { playlistSchema } from '../validation/playlistValidation'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

function DeletePlaylistWindow(name) {
    const [{ user }, dispatch] = useStateValue()

    const handleCancle = () => {
        dispatch({
            type: 'SET_SHOWDELETEPLAYLISTWINDOW',
            showDeletePlaylistWindow: false
        })
    }

    const handlSubmit = async () => {
        try {
            axios.delete(`http://localhost:5555/playlist/delete/${user.email}`, {data:{ name: name.name }})
                .then(response => {
                    console.log(response)
                    if (response.data === "deleted") {
                        toast.success("Playlist deleted successfully")
                        setTimeout(() => {
                            dispatch({
                                type: 'SET_SHOWDELETEPLAYLISTWINDOW',
                                showDeletePlaylistWindow: false
                            })
                        }, 800)
                    }
                    else {
                        toast.error("delete fail")
                    }
                })
                .catch((error) =>
                    console.log(error)
                )
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black bg-opacity-30">
            <Toaster />
            <div className="relative w-[400px] bg-grayBackground rounded-lg shadow-lg">
                <div className="p-8">
                    <p className="text-neutral-200 text-base font-thin tracking-wider mb-4">
                        Are you sure you want to delete this playlist?
                    </p>
                    <div className="flex justify-end gap-2">
                        <button className="text-neutral-200 font-extralight tracking-wider text-sm border border-lightTextColor rounded-md px-4 py-2" onClick={handleCancle}>
                            Cancel
                        </button>
                        <button
                            className="bg-lightTextColor hover:opacity-90 text-backgroundColor font-extralight select-none text-sm tracking-wider rounded-md px-4 py-2"
                            onClick={handlSubmit}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeletePlaylistWindow

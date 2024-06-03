import React, { useState } from 'react'
import { useStateValue } from '../StateProvider'
import { playlistSchema } from '../validation/playlistValidation'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

function CreatePlaylistWindow() {
    const [{ user }, dispatch] = useStateValue()
    const [inputTxt, setInputTxt] = useState("")

    const handleCancle = () => {
        dispatch({
            type: 'SET_SHOWCREATEPLAYLISTWINDOW',
            showCreatePlaylistWindow: false
        })
    }

    const handleChange = (e) => {
        setInputTxt(e.target.value)
    }

    const handlSubmit = async () => {
        console.log(inputTxt)
        const playlist = {
            name: inputTxt
        }
        try {
            //validation
            await playlistSchema.validate(playlist, { abortEarly: false })
            //check if user has a playlist by same name
            axios.post("http://localhost:5555/playlist/findplaylist", { playlist: { name: playlist.name }, email: user.email })
                .then(res => {
                    console.log(res)
                    if (res.status === 200) {
                        //creating playlist
                        axios.post("http://localhost:5555/playlist/createplaylist", { name: playlist.name, email: user.email })
                            .then(response => {
                                if (response.status === 200) {
                                    toast.success("Playlist is created");
                                    setTimeout(() => {
                                        dispatch({
                                            type: 'SET_SHOWCREATEPLAYLISTWINDOW',
                                            showCreatePlaylistWindow: false
                                        })
                                    }, 800)
                                }
                                else {
                                    toast.error("something went wrong")
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                toast.error("Please try again later")
                                toast.error("something went wrong")
                            })
                    }
                    else {
                        toast.error("Playlist already exists")
                    }
                })

        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
        }
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
                        onChange={handleChange}
                        value={inputTxt}
                    />
                    <div className="flex justify-end gap-2">
                        <button className="text-neutral-200 font-extralight tracking-wider text-sm border border-lightTextColor rounded-md px-4 py-2" onClick={handleCancle}>
                            Cancel
                        </button>
                        <button
                            className="bg-lightTextColor hover:opacity-90 text-backgroundColor font-extralight select-none text-sm tracking-wider rounded-md px-4 py-2"
                            onClick={handlSubmit}>
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePlaylistWindow

import React, { useState } from 'react'
import { useStateValue } from '../StateProvider'
import { playlistSchema } from '../validation/playlistValidation'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

function EditPlaylistWindow(id) {
    const [{ user, showEditPlaylistWindow}, dispatch] = useStateValue()
    const [inputTxt, setInputTxt] = useState("")

    const handleCancle = () => {
        dispatch({
            type: 'SET_SHOWEDITPLAYLISTWINDOW',
            showEditPlaylistWindow: false
        })
    }

    const handleChange = (e) => {
        setInputTxt(e.target.value)
    }

    const handlSubmit = async () => {
        console.log(id)
    }
    return (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-black bg-opacity-30">
            <Toaster />
            <div className="relative w-[400px] bg-grayBackground rounded-lg shadow-lg">
                <div className="p-8">
                    <p className="text-neutral-200 text-base font-thin tracking-wider mb-4">
                        Enter new name
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
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPlaylistWindow

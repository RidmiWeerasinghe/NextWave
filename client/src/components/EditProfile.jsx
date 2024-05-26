import React, { useState, useRef, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function EditProfile() {
    const [{ user }, dispatch] = useStateValue()
    const inputRef = useRef(null)
    const [form, setForm] = useState({
        username: user.username,
        email: user.email,
        password: user.password,
        imageUrl: user.imageUrl
    })

    useEffect(() => {
        console.log("page refreshing")
    }, [user])

    const navigate = useNavigate()

    const handleSubmit = async () => {
        const username = form.username
        const imageUrl = form.imageUrl
        const password = form.password
        console.log(imageUrl)
        await axios.put(`http://localhost:5555/users/update/${user.email}`, { username: username, imageUrl: imageUrl, password: password })
            .then(response => {
                console.log(response)
                toast.success("account updated successfully")
            })
            .catch((err) => {
                console.log(err)
            })

        await axios.get(`http://localhost:5555/users/get/${user.email}`)
            .then(response => {
                console.log(response.data.user)
                dispatch({
                    type: 'SET_USER',
                    user: response.data.user
                })
                navigate('/myprofile')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleDelete = () => {

        //removing history
        axios.delete(`http://localhost:5555/history/delete/${user.email}`)
            .then(response => {
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })

        //removing user
        axios.delete(`http://localhost:5555/users/delete/${user.email}`)
            .then(response => {
                console.log(response)
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleChange = (e) => {
        setForm((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setForm((pre) => {
            return {
                ...pre,
                imageUrl: URL.createObjectURL(file)
            }
        })
        console.log(file)
    }

    return (
        <div className={"bg-darkBlue  overflow-hidden mb-20"}>
            <Toaster/>
            <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-6">
                    Edit Profile
                </h1>
                <div className="grid grid-cols-[max-content,auto] mt-2 mb-20 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                    <div className='flex items-center justify-center flex-col'>
                        <img className="w-60 h-60 rounded-full mt-8" src={form.imageUrl === null ? "/images/user.jpg" : form.imageUrl} />
                        <div className='flex items-center justify-center '>
                            <input type="file" name="imageUrl" id="imageUrl" ref={inputRef} onChange={handleImageChange} className=" text-lightTextColor w-2/3 rounded-sm text-base mt-5 bg-darkBlue focus:border-2 focus:border-white cursor-pointer" />
                        </div>

                    </div>


                    <form className="space-y-4 md:space-y-6" action="#">
                        <div className='flex items-center justify-center'>
                            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-darkBlue border-b border-lightTextColor focus:border-none" placeholder="🖉 name" required="" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <input type="text" name="email" id="email" value={form.email} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-darkBlue border-b border-lightTextColor focus:border-none" placeholder="✉ Email" required="" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="🗝 Password" className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-darkBlue border-b border-lightTextColor focus:border-none" required="" />
                        </div>
                    </form>
                    <div className='flex items-center justify-center'>

                    </div>
                    <div className='flex items-center justify-around px-20'>
                        <button onClick={handleSubmit} className="w-4/12 text-lightTextColor  p-3 bg-darkBlue border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0">Save</button>
                        <button onClick={handleDelete} className="w-4/12 text-lightTextColor  p-3 bg-darkBlue border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0">Delete Account</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditProfile
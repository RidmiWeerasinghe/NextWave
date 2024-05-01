import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import EditIcon from '@mui/icons-material/Edit'
import axios from 'axios'
import { Link } from 'react-router-dom'

function EditProfile() {
    const [{ user }, dispatch] = useStateValue()
    const [form, setForm] = useState({
        username: user.username,
        email: user.email,
        password: user.password,
    })

    useEffect(() => {

    }, [])

    const handleSubmit = () => {

    }
    const handleChange = (e) => {
        setForm((pre) =>{
            return{
                ...pre,
                [e.target.name] : [e.target.value]
            }
        })
    }

    return (
        <div className={"bg-darkBlue  overflow-hidden"}>
            <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-6">
                    Edit Profile
                </h1>
                <div className="grid grid-cols-[max-content,auto] mt-2 mb-20 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                    <div className='flex items-center justify-center flex-col'>
                        <img className="w-56 h-56 rounded-full mt-8" src='/images/user.jpg' />
                        <Link to={'/editprofile'}>
                            <p className="text-slate-200 text-sm min-w-fit cursor-pointer pt-4">
                                Change poifile <EditIcon />
                            </p>
                        </Link>
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
                        <button onClick={handleSubmit} className="w-4/12 text-lightTextColor  p-3 bg-darkBlue border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0">Delete Account</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default EditProfile
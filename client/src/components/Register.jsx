import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person'
import MailIcon from '@mui/icons-material/Mail'
import LockIcon from '@mui/icons-material/Lock'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { userSchema } from '../validation/userValidation'

function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value,
            }
        })
    }
    //console.log(form)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const username = form.username
        const password = form.password
        const confirmPassword = form.confirmPassword
        const email = form.email

        const user = {
            username,
            email,
            password,
            confirmPassword
        }


        try {
            await userSchema.validate(user, { abortEarly: false })
            if (form.password != form.confirmPassword) {
                return toast.error("confirm password doesn't match")
            }

            axios.post('http://localhost:5555/users/email', { email: form.email })
                .then(result => {
                    console.log(result)
                    if (result.data === "ok") {
                        axios.post("http://localhost:5555/users", user)
                            .then(() => {
                                navigate('/login')
                            })
                            .catch((error) => {
                                console.log(error)
                            })
                    }
                    else {
                        toast.error(result.data)
                    }
                })
        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
        }


    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-grayBackground dark:border-grayBackground">
                    <Toaster />
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-lightTextColor text text-center">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className='flex items-center justify-center'>
                                <input type="text" name="username" id="username" value={form.username} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" placeholder="name" required="" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="text" name="email" id="email" value={form.email} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" placeholder="✉ Email" required="" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="🗝 Password" className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" required="" />
                            </div>
                            <div className='flex items-center justify-center'>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="🗝 Password" className="text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" required="" />
                            </div>
                        </form>
                        <div className='flex items-center justify-center'>
                            <button onClick={handleSubmit} className="w-10/12 text-lightTextColor  p-3 bg-grayBackground border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0">Sign Up</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register


// < form className = "space-y-4 md:space-y-6" action = "#" >
//                         <div>
//                             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><PersonIcon /> Username</label>
//                             <input type="text" name="username" id="username" value={form.username} onChange={handleChange} className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="myName" required="" />
//                         </div>
//                         <div>
//                             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><MailIcon /> Email</label>
//                             <input type="text" name="email" id="email" value={form.email} onChange={handleChange} className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required="" />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><LockIcon /> Password</label>
//                             <input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
//                         </div>
//                         <div>
//                             <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><LockIcon /> Confirm password</label>
//                             <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" required="" />
//                         </div>
//                     </form >
// <button onClick={handleSubmit} className="w-full text-lightTextColor bg-blueBtnColor hover:bg-blueBtnHoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>


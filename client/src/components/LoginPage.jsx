import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MailIcon from '@mui/icons-material/Mail'
import KeyIcon from '@mui/icons-material/Key'
import axios from 'axios'
import { loginSchema } from '../validation/userValidation'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useStateValue } from '../StateProvider'

function Login() {
    const [{ username }, dispatch] = useStateValue()
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        setloginData((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleClick = async (e) => {
        e.preventDefault()
        const user = {
            email: loginData.email,
            password: loginData.password
        }

        try {
            await loginSchema.validate(user, { abortEarly: false })
            axios.post('http://localhost:5555/users/login', { email: loginData.email, password: loginData.password })
                .then(result => {
                    console.log(result)
                    if (result.data.status === "success") {
                        dispatch({
                            type:'SET_USER',
                            user :result.data.user
                        })
                        navigate('/')
                    }
                    else {
                        toast.error(result.data.status)
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
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-grayBackground dark:border-grayBackground">
                    <Toaster />
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-lightTextColor text text-center">
                            Sign In
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><MailIcon /> Email</label>
                                <input type="text" onChange={handleChange} name="email" id="email" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><KeyIcon /> Password</label>
                                <input type="password" onChange={handleChange} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-blueTextColor hover:underline dark:text-blueTextColor">Forgot password?</a>
                            </div>
                        </form>
                        <NavLink to={'/'}><button type="submit" className="w-full text-lightTextColor bg-blueBtnColor hover:bg-blueBtnHoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5" onClick={handleClick}>Sign In</button>
                        </NavLink><p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <NavLink to={'/register'} className="font-medium text-blueTextColor hover:underline dark:text-blueTextColor">Sign up</NavLink>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

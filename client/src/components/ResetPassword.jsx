import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import { passwordSchema } from '../validation/userValidation'

function ResetPassword() {
    const [userEmail, setUserEmail] = useState()
    const [isValid, setIsValid] = useState(false)
    const [form, setForm] = useState({ password: "", confirmPassword: "" })


    //getting the reset token from url
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const resetToken = query.get('token')

    //verifying the user
    useEffect(() => {
        axios.post(`http://localhost:5555/users/verify-reset-token`, { token: resetToken })
            .then(response => {
                setUserEmail(response.data.email)
                setIsValid(true)
            })
            .catch(err => {
                toast.error("Invalid or expired token")
            })
    }, [])

    const navigate = useNavigate()

    const handleReset = async () => {

        const passwordObj = {
            password: form.password
        }

        //are password & confirm equal?
        if (form.password != form.confirmPassword) {
            return toast.error("confirm password doesn't match")
        }

        try {
            await passwordSchema.validate(passwordObj, { abortEarly: false })

            axios.put(`http://localhost:5555/users/update/password/${userEmail}`, { newPassword: form.password })
                .then(response => {
                    console.log(response.data)
                    toast.success("Password reset successfully", { duration: 2000 })
                    navigate('/')
                })
                .catch(err => {
                    console.log(err)
                    toast.error("Something went wrong")
                })
        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
        }
    }

    const handleChange = (e) => {
        setForm((pre) => {
            return {
                ...pre,
                [e.target.name]: e.target.value,
            }
        })
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-grayBackground dark:border-grayBackground">
                    <Toaster />
                    {
                        isValid ?
                            (<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-lightTextColor text text-center">
                                    Reset Password
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div className='flex items-center justify-center'>
                                        <input type="password" name="password" id="password" value={form.password} onChange={handleChange} placeholder="🗝 Enter new password" className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" required="" />
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <input type="password" name="confirmPassword" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="🗝 Confirm Password" className="text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" required="" />
                                    </div>
                                </form>
                                <div className='flex items-center justify-center'>
                                    <button onClick={handleReset} className="w-10/12 text-lightTextColor  p-3 bg-grayBackground border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0">Reset</button>
                                </div>
                            </div>)
                            :
                            (<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-lightTextColor text text-center">
                                    Verifying user
                                </h1>
                                <div className='flex items-center justify-center m-8'>
                                    <img src="/images/spinner.gif" className=' w-3/6' alt="" />
                                </div>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default ResetPassword

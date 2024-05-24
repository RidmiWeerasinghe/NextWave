import axios from 'axios'
import React, { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { emailSchema } from '../validation/userValidation'

function ResetPasswordGetEmail() {
    const [email, setEmail] = useState()
    const [isChecking, setIsChecking] = useState(false)

    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = async () => {
        setIsChecking(true)
        const emailObj = {
            email: email
        }

        try {
            //email validation
            await emailSchema.validate(emailObj, { abortEarly: false })

            //check if the email is registered in db
            axios.get(`http://localhost:5555/users/get/${email}`)
                .then(response => {
                    //yes, registered in db
                    if (response.status === 201) {
                        console.log(response.data.user)
                        //continue
                        axios.post(`http://localhost:5555/users/sendemail`, { email: email })
                            .then(response => {
                                console.log(response.data)
                                toast.success("Reset link has been sent", { duration: 4000 })
                                toast.success(response.data.message, { duration: 4000 })
                                setIsChecking(false)
                            })
                            .catch(err => {
                                console.log(err)
                                toast.error(response.data.message)
                            })
                    }
                    //no, not registered in db
                    else {
                        toast.error("Email is not registered")
                        setIsChecking(false)
                    }
                })
                .catch(error => {
                    console.log(error)
                    toast.error("Email is not registered")
                    setIsChecking(false)
                })

        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
            setIsChecking(false)
        }
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-grayBackground dark:border-grayBackground">
                    <Toaster />
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h6 className="text-lg leading-tight tracking-tight text-gray-900 md:text-lg dark:text-lightTextColor text text-center">
                            Enter your email to get password reset link
                        </h6>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div className='flex items-center justify-center'>
                                <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="✉ Enter your email" className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-grayBackground border-b border-lightTextColor focus:border-none" required="" />
                            </div>
                        </form>
                        <div className='flex items-center justify-center'>
                            <button onClick={handleSubmit} className="w-10/12 text-lightTextColor  p-3 bg-grayBackground border border-lightTextColor hover:bg-lightTextColor hover:text-zinc-800 focus:ring-3.5 focus:outline-none focus:ring-primary-300 font-large rounded-lg text-lg px-5 text-center mt-8 mb-0 flex items-center justify-center">
                                Submit
                                {isChecking && <img
                                    src="/images/spinner.gif"
                                    className='w-6 ml-2'
                                    alt="Loading spinner"
                                />}
                                </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordGetEmail

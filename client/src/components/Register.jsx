import React from 'react'
import PersonIcon from '@mui/icons-material/Person'
import MailIcon from '@mui/icons-material/Mail'
import LockIcon from '@mui/icons-material/Lock';

function Register() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-grayBackground dark:border-grayBackground">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-lightTextColor text text-center">
                            Sign Up
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><PersonIcon/> Username</label>
                                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="myName" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><MailIcon/> Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@mail.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><LockIcon/> Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-lightTextColor"><LockIcon/> Confirm password</label>
                                <input type="password" name="password" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-700 dark:placeholder-gray-400 dark:text-lightTextColor dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" required="" />
                            </div>
                            <button type="submit" className="w-full text-lightTextColor bg-blueBtnColor hover:bg-blueBtnHoverColor focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={function handleClick() { console.log("btn clicked") }}>Sign Up</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

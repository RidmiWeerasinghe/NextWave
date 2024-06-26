import React, { useState, useRef, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { userSchema } from '../validation/userValidation'

function EditProfile() {
    const [{ user }, dispatch] = useStateValue()
    const inputRef = useRef(null)
    const [form, setForm] = useState({
        username: user.username,
        email: user.email,
        password: user.password,
        imageUrl: user.imageUrl
    })
    const [imageFile, setImageFile] = useState()

    useEffect(() => {
        console.log("page refreshing")
    }, [user])

    const navigate = useNavigate()

    //update user
    const handleSubmit = async () => {
        const userObj = {
            username: form.username,
            email: form.email,
            password: "123456789*",
            confirmPassword: "123456789*",
        }

        try {

            await userSchema.validate(userObj, { abortEarly: false })
            const username = form.username
            let imageUrl = null
            const password = user.password

            if (imageFile) {
                const formData = new FormData()
                formData.append('profilePic', imageFile)

                //generating url
                try {
                    const response = await axios.post('http://localhost:5555/users/image/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    //console.log('File URL:', response.data.fileUrl)
                    imageUrl = response.data.fileUrl

                } catch (error) {
                    console.error('Error uploading file:', error)
                }
            }


            axios.post('http://localhost:5555/users/email', { email: form.email })
                .then(async result => {
                    if (result.status === 201 && user.email !== form.email) {
                        toast.error("email is already registered")
                    }
                    else {
                        await axios.put(`http://localhost:5555/users/update/${user.email}`, { username: username, imageUrl: imageUrl, password: password, newEmail: form.email })
                            .then(response => {
                                console.log(response)
                                toast.success("account updated successfully")
                            })
                            .catch((err) => {
                                console.log(err)
                            })

                        await axios.get(`http://localhost:5555/users/get/${form.email}`)
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
                })
                .catch(error => {
                    console.log(error)
                    toast.error("something went wrong")
                    toast.error("Please try again later")
                })
        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
        }
    }

    //delete user
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
        setImageFile(file)
    }

    const convertDateFormat = () => {

        const date = new Date(user.updatedAt)

        // Extracting date parts
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0')// Adding 1 to month since it's zero-based
        const day = String(date.getDate()).padStart(2, '0')

        // Forming the desired date string
        const formattedDate = `${year}-${month}-${day}`
        return formattedDate
    }

    return (
        <div className={"bg-darkBlue  overflow-hidden mb-20"}>
            <Toaster />
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
                        <div className='flex items-center justify-center mt-10'>
                            <input type="text" name="username" id="username" value={form.username} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-darkBlue border-b border-lightTextColor focus:border-none" placeholder="🖉 name" required="" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <input type="text" name="email" id="email" value={form.email} onChange={handleChange} className=" text-lightTextColor text-base mt-5 block w-10/12 pl-1 p-3 bg-darkBlue border-b border-lightTextColor focus:border-none" placeholder="✉ Email" required="" />
                        </div>
                        <div className='flex items-center justify-center'>
                            <label htmlFor="" className='text-lightTextColor text-sm mt-5 block w-10/12'><i>Last Updated on : {convertDateFormat()}</i></label>
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
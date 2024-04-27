import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import EditIcon from '@mui/icons-material/Edit'
import PlaylistCard from './PlaylistCard'
import axios from 'axios'
import { currentUserPlaylistsInDummy } from '../dummyData/dummy'
import { Link } from 'react-router-dom'

function MyProfile() {
    const [{ user }, dispatch] = useStateValue()
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState(currentUserPlaylistsInDummy)

    console.log(user)

    useEffect(() => {
        //loading all playlists
        if (user.username) {
            try {
                axios.get(`http://localhost:5555/playlist/getallplaylist/${user.email}`)
                    .then(response => {
                        console.log(response.data.data)
                        setCurrentUserPlaylists(response.data.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("no user")
        }
    }, [])

    return (
        <div className={"bg-darkBlue  overflow-hidden"}>
            <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                    <img className="w-56 h-56 rounded-full" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />

                    <div className="flex place-content-end max-md:place-items-center flex-col">
                        <h2
                            className="font-bold text-6xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                            dangerouslySetInnerHTML={{
                                __html: `Hello ${user.username}`,
                            }}
                        />

                        <div className="flex max-md:flex-col items-center gap-3 max-md:my-0 max-md:gap-2 my-2 max-md:mt-4">
                            <p
                                className="text-slate-200 text-sm max-md:text-xs max-md:text-center"
                                dangerouslySetInnerHTML={{
                                    __html: `joined on 2024-04-01`
                                }}
                            />
                            <div className="bg-darkTextColor rounded-full w-1 h-1 max-md:hidden"></div>
                            <p className="text-slate-200 text-sm max-md:text-xs">
                                {user?.playlist.length} playlists
                            </p>
                            <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
                            <p className="text-slate-200 text-sm min-w-fit">
                                {user?.email}
                            </p>
                            <p className="text-slate-200 text-sm min-w-fit cursor-pointer">
                                <EditIcon />
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />
            <section className="flex ml-10 my-6 mt-10 flex-col mr-6">
                <div className='flex justify-between items-center ml-3'>
                    <h1 className="font-medium text-xl text-lightTextColor my-4">
                        My Most played Playlists
                    </h1>
                    <Link to={'/myplaylists'}><h2 className='font-light text-sm text-lightTextColor mr-4 hover:underline cursor-pointer'>show all playlists</h2></Link>
                </div>
                <div className='flex flex-wrap'>
                    {currentUserPlaylists.slice(0,4).map((playlist) => (
                        <div key={playlist.id} className="w-1/2">
                            <PlaylistCard playlist={playlist} threedots={false}/>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex justify-between ml-10 my-6 mt-10 items-center mr-6">
                <div className='flex justify-between w-full  items-center'>
                    <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                        Suggest for you
                    </h1>
                    <h2 className=' font-light text-sm w-fit text-lightTextColor mr-8 hover:underline cursor-pointer'>show all</h2>
                </div>
            </section >
        </div>
    )
}

export default MyProfile
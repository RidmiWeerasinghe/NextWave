import React, { useEffect, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { favoriteSongs } from '../dummyData/dummy'
import AlbumSongLists from './AlbumSongLists'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import FloatingButton from './FloatingButton'

function MyFavorites() {
    const [{ user, pageRefresh, favoriteTracks, hidePlayer }, dispatch] = useStateValue()
    const [favorites, setFavorites] = useState(favoriteSongs)

    useEffect(() => {
        if (user.email) {
            axios.get(`http://localhost:5555/songs/getallfavourites/${user.email}`)
                .then(response => {
                    //console.log(response.data)
                    setFavorites(response.data)
                    dispatch({
                        type: 'SET_FAVORITETRACKS',
                        favoriteTracks: response.data.tracks
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [pageRefresh])

    console.log("favorites.count")
    console.log(favoriteTracks)

    const notLoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                Access to your favorites is only available to logged-in users. Please
                log in to view your favorite songs or try again later.
            </p>
        </div>
    )
    const LoggedInMessage = (
        <div className='h-full overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue' style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <section className=" px-14 max-md:px-2 overflow-auto pb-8 pt-5">
                <section className="flex justify-normal items-center pr-6">
                    <h3 className="text-neutral-50  text-2xl flex items-center max-md:text-xl px-4 mb-5">
                        My Favorites
                    </h3>
                    <p className='text-lightTextColor text-sm flex items-center max-md:text-xl px-4 mb-5'>
                        {favorites.count} Songs
                    </p>
                </section>

                {favorites.count > 0 && favoriteTracks.map((song) => (
                    <AlbumSongLists key={song.songID} trackID={song.songID} removeBtnVisible={false} />
                ))}

                {!favorites.count && (
                    <div className="w-full flex justify-center items-center mt-10">
                        <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                            You haven't added any song to favorites yet.
                        </p>
                    </div>
                )}
            </section>
        </div>
    )
    return (
        <div className=' mb-20 relative'>
            <Toaster />
            {!user.username ? notLoggedInMessage : LoggedInMessage}
            <FloatingButton/>
        </div>
    )
}

export default MyFavorites

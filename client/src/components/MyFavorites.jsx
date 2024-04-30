import React from 'react'
import { useStateValue } from '../StateProvider'

function MyFavorites() {
    const [{ user }, dispatch] = useStateValue()

    const notLoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                Access to your favorites is only available to logged-in users. Please
                log in to view your favorite songs or try again later.
            </p>
        </div>
    )
    const LoggedInMessage = (
        <div className="w-full flex justify-center items-center mt-10">
            <h1 className=' text-white'>My Favourites</h1>
        </div>
    )
    return (
        <div>
            {!user.username ? notLoggedInMessage :  LoggedInMessage }
        </div>
    )
}

export default MyFavorites

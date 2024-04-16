import React from 'react'
import { useStateValue } from '../StateProvider'

function MyPlaylists() {
    const [{ user }, dispatch] = useStateValue()

    return (
        <div>
            {!user.loggedIn && <div className="w-full flex justify-center items-center mt-10">
                <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                    Access to your playlists is only available to logged-in users. Please
                    log in to view your playlists or try again later.
                </p>
            </div>}
        </div>
    )
}

export default MyPlaylists

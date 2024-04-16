import React from 'react'
import { useStateValue } from '../StateProvider'

function MyFavorites() {
    const [{ user }, dispatch] = useStateValue()

    return (
        <div>
            {!user.loggedIn && <div className="w-full flex justify-center items-center mt-10">
                <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                    Access to your favorites is only available to logged-in users. Please
                    log in to view your favorite songs or try again later.
                </p>
            </div>}
        </div>
    )
}

export default MyFavorites

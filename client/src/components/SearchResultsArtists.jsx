import React, { useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useStateValue } from '../StateProvider'
function SearchResultsArtists() {
    const [{searchedArtists}, dispatch] = useStateValue()

    console.log("searchedArtists")
    console.log(searchedArtists)
    
    return (
        <div className="overflow-auto py-6  px-9 max-md:px-1">
            <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                search results.....
            </h3>
            <div className="flex flex-wrap justify-between max-md:justify-center max-md:gap-x-2 max-md:px-3 gap-6 px-8">
                {searchedArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>


        </div>
    )
}

export default SearchResultsArtists
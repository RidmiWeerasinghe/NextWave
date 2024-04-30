import React from 'react'
import AlbumSongLists from './AlbumSongLists'
import { useStateValue } from '../StateProvider'

function SearchResultsTracks() {
    const [{searchedTracks}, dispatch] = useStateValue()

    console.log(searchedTracks)

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
            <section className="w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Search Results.....
                </h1>
                <div className="flex flex-wrap justify-between gap-2 overflow-scroll h-full mr-4">
                    {searchedTracks.map((track) => (
                        <AlbumSongLists key={track.id} trackID={track.id} />
                    ))}
                </div>
            </section >
        </div >
    )
}

export default SearchResultsTracks

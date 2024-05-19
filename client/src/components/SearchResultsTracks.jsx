import React from 'react'
import AlbumSongLists from './AlbumSongLists'
import { useStateValue } from '../StateProvider'

function SearchResultsTracks() {
    const [{searchedTracks}, dispatch] = useStateValue()

    console.log(searchedTracks)

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
            <section className="w-full my-4 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Search Results.....
                </h1>
                <div className="flex flex-wrap justify-between overflow-scroll h-full">
                    {searchedTracks.map((track) => (
                        <AlbumSongLists key={track.id} trackID={track.id} />
                    ))}
                </div>
            </section >

            {searchedTracks.length == 0 &&
                <section className="flex w-full my-6 items-center justify-center">
                <h1 className="text-lg text-lightTextColor">
                    No song found for the given name 🤧
                </h1>
            </section >
            }
        </div >
    )
}

export default SearchResultsTracks

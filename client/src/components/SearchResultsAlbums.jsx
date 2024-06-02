import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import MusicCard from './MusicCard'
import { useStateValue } from '../StateProvider'

function SearchResultsAlbums() {
    const [{searchedAlbums, hidePlayer }, dispatch] = useStateValue()

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden h-full overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue" style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <section className="w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Search Results.....
                </h1>
                <div className="flex flex-wrap justify-between gap-8 overflow-scroll h-full mr-4">
                    {searchedAlbums.map((item) => (
                        <MusicCard album={item} key={item.id} />
                    ))}
                </div>
            </section >
            {searchedAlbums.length == 0 &&
                <section className="flex w-full my-6 items-center justify-center">
                <h1 className="text-lg text-lightTextColor">
                    No album found for the given name 🤧
                </h1>
            </section >
            }
        </div >
    )
}

export default SearchResultsAlbums

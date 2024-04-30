import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import MusicCard from './MusicCard'
import { useStateValue } from '../StateProvider'

function SearchResultsAlbums() {
    const [{searchedAlbums }, dispatch] = useStateValue()

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
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
        </div >
    )
}

export default SearchResultsAlbums

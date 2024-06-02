import React from 'react'
import { useStateValue } from '../StateProvider'
import PlaylistCard from './PlaylistCard'

function SearchResultsMyPlaylists() {

    const [{searchResultsLoading, searchedUserPlaylist }, dispatch] = useStateValue()

    console.log("searchedUserPlaylist")
    console.log(searchedUserPlaylist)
    return (
        <div className=' mb-20'>
            <div className="overflow-auto pl-7 mr-8 max-md:pl-2 mt-8 ">
                {!searchResultsLoading ?
                    (<section className="mt-8 flex flex-col mb-12">
                        <h3 className="text-xl text-neutral-200 mb-2 pl-4 mt-4">
                            Search Results....
                        </h3>
                        {(searchedUserPlaylist.length < 0 || !searchedUserPlaylist.length) ?
                            (<div className="w-full flex justify-center items-center mt-10">
                                <p className="text-neutral-400 w-1/2 text-center max-md:w-full max-md:px-4">
                                    No matching results found
                                </p>
                            </div>) :
                            (<section className="mt-4 flex flex-col mb-12">
                                {searchedUserPlaylist.map((playlist) => (
                                    <PlaylistCard key={playlist.id} playlist={playlist} threedots={true} />
                                ))}
                            </section>)}
                    </section>)
                    :
                    //searching
                    (<section className="mt-8 flex justify-start items-center">
                        <h3 className="text-xl text-neutral-200 pl-5">
                            Searching....
                        </h3>
                        <img src="/images/spinner.gif" className='ml-2 w-5' alt="" />
                    </section>)
                }

            </div>

        </div>
    )
}

export default SearchResultsMyPlaylists

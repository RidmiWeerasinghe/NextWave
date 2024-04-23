import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import AlbumSongList from './AlbumSongLists'

function SingleAlbum() {
    const albumID = useParams()
    //console.log(albumID)
    const [{ accessToken, currentSingleAlbum }, dispatch] = useStateValue()
    const [{ isLoading, setIsLoading }] = useState(true)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        try {
            var authParameters = {
                method: 'GET',
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            fetch(`https://api.spotify.com/v1/albums/${albumID.id}`, authParameters)
                .then(result => result.json())
                .then(data => {
                    if (data) {
                        console.log("y")
                        //setIsLoading(false);
                        dispatch({
                            type: "SET_CURRENTSINGLEALBUM",
                            currentSingleAlbum: data
                        })
                    }
                    else {
                        console.log("no")
                    }

                }
                )
        } catch (error) {
            console.log(error)
        }
    }, [])
    console.log("id : " + currentSingleAlbum.tracks.items.id)
    return (
        <div className={"bg-darkBlue  overflow-hidden "}>
            <div className={"bg-darkBlue  overflow-hidden "}>
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                    <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                        <img className="w-56 h-56 rounded-md" src={currentSingleAlbum?.images[0].url} />

                        <div className="flex place-content-end max-md:place-items-center flex-col">
                            <h2
                                className="font-bold text-4xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                                dangerouslySetInnerHTML={{
                                    __html: `${currentSingleAlbum.name}`,
                                }}
                            />

                            <div className="flex max-md:flex-col items-center gap-3 max-md:my-0 max-md:gap-2 my-2 max-md:mt-4">
                                <p
                                    className="text-slate-200 text-sm max-md:text-xs max-md:text-center"
                                    dangerouslySetInnerHTML={{
                                        __html: `${currentSingleAlbum.label}`,
                                    }}
                                />
                                <div className="bg-darkTextColor rounded-full w-1 h-1 max-md:hidden"></div>
                                <p className="text-slate-200 text-sm max-md:text-xs">
                                    {currentSingleAlbum.release_date}
                                </p>
                                <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
                                <p className="text-slate-200 text-sm min-w-fit">
                                    {currentSingleAlbum.total_tracks}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
                <section className="mx-12 mb-10 mt-6 max-md:mx-2">
                    {!isLoading &&currentSingleAlbum?.tracks.items.map((track) => (
                        <AlbumSongList key={track.id} trackID={track.id} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default SingleAlbum

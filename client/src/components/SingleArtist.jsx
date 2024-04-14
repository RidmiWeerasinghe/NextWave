import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import SpotifyWebApi from 'spotify-web-api-js'
import { currentAtistTracks } from '../dummyData/dummy'
import AlbumSongList from './AlbumSongLists'

function SingleArtist() {
    const [{ accessToken, currentAtist, currentAtistTracks }, dispatch] = useStateValue()
    const id = useParams()
    console.log(id.id)
    console.log(currentAtistTracks)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        var authParameters = {
            method: 'GET',
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        fetch(`https://api.spotify.com/v1/artists/${id.id}/top-tracks `, authParameters)
            .then(result => result.json())
            .then(data => dispatch({
                type: 'SET_CURRENTARTISTTRACKS',
                currentAtistTracks: data
            })
            ).catch(console.error())
    }, [])
    useEffect(() => {
        spotify.getArtist(id.id).then(
            function (data) {
                console.log('Artist information', data);
                dispatch({
                    type: 'SET_CURRENTARTIST',
                    currentAtist: data
                })
            },
            function (err) {
                console.error(err);
            }
        );
    }, [])
    return (
        <div className={"bg-darkBlue  overflow-hidden "}>
            <div className={"bg-darkBlue  overflow-hidden "}>
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                    <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                        <img className="w-60 h-60 rounded-lg" src={currentAtist.images[0].url} />

                        <div className="flex place-content-center max-md:place-items-center flex-col">
                            <h2
                                className="font-bold text-4xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                                dangerouslySetInnerHTML={{
                                    __html: `${currentAtist.name}`,
                                }}
                            />

                        </div>
                    </div>
                </div>
                <section className="mx-12 mb-10 mt-6 max-md:mx-2">
                    {currentAtistTracks?.tracks.map((track) => (
                        <AlbumSongList key={track.id} trackID={track.id} />
                    ))}
                </section>
            </div>
        </div>
    )
}

export default SingleArtist

// {currentAtistTracks?.tracks.map((track) => (
//     <AlbumSongList key={track.id} trackID={track.id} />
// ))}
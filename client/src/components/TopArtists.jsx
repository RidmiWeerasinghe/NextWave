import React, { useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useStateValue } from '../StateProvider'

function TopArtists() {
    const [{ topArtists, accessToken }, dispatch] = useStateValue()

    useEffect(() => {
        var authParameters = {
            method: 'GET',
            mode: 'cors',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${accessToken}`
            },
        }
        fetch("https://api.spotify.com/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6", authParameters)
            .then(result => result.json())
            .then(data =>
                dispatch({
                    type: 'SET_TOPARTISTS',
                    topArtists: data.artists
                })
                //console.log(data.artists)
            )
    }, [])
    console.log("topArtists name:" + topArtists[0].name)

    return (
        <div className="overflow-auto py-6  px-9 max-md:px-1">
            <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                Top Artists
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(9rem,1fr))] max-md:grid-cols-[repeat(auto-fit,minmax(7rem,0fr))] max-md:gap-x-2 max-md:justify-center max-md:px-3 gap-y-6 px-7">
               {topArtists.map((artist) => {
                    <ArtistCard key={artist.id} artistID={artist.id} />
                })}
                <ArtistCard artistID={topArtists[0].id}/>
            </div>
        </div>
    )
}

export default TopArtists

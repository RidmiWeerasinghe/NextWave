import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'

function TopPlaylists() {
    const [{ accessToken }, dispatch] = useStateValue()

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {

        if (accessToken) {
            console.log(accessToken)
            spotify.getPlaylist("37i9dQZF1DXcBWIGoYBM5M")
                .then(function (data) {
                    console.log( data);
                }, function (err) {
                    console.error(err);
                })
        }
    }, [])

    return (
        <div className=" bg-darkBlue pl-10 pr-4 max-md:pl-4 overflow-hidden ">
            <section className=" w-full my-6 ">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Top Playlists
                </h1>
                <div className="flex gap-6 overflow-scroll h-full">
                    {/* {trendingAlbums.map((item) => (
                        <MusicCard album={item} key={item.id} />
                    ))} */}
                </div>
            </section >
        </div >
    )
}

export default TopPlaylists

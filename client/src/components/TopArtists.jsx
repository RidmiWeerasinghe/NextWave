import React, { useEffect } from 'react'
import ArtistCard from './ArtistCard'
import { useStateValue } from '../StateProvider'
import SpotifyWebApi from 'spotify-web-api-js'

function TopArtists() {
    const [{ topArtists, accessToken , hidePlayer}, dispatch] = useStateValue()

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)
    useEffect(() => {
        spotify
            .getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8', '63yrD80RY3RNEM2YDpUpO8', '21aa4pj9BvbFB2iT8kRpnq', '06HL4z0CvFAxyc27GXpf02','66CXWjxzNUsdJxJ2JdwvnR','0X2BH1fck6amBIoJhDVmmJ','6qqNVTkY8uBg9cP3Jd7DAH','5WUlDfRSoLAfcVSX1WnrxN','53XhwfbYqKCa1cC15pYq2q'])
            .then(
                function (data) {
                    console.log('Artists information', data);
                    dispatch({
                        type: 'SET_TOPARTISTS',
                        topArtists: data.artists
                    })
                },
                function (err) {
                    console.error(err);
                }
            );
    }, [])
    console.log("topArtists[3]")
    console.log(topArtists[3])

    return (
        <div className="py-6  px-9 max-md:px-1 h-full overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue" style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <h3 className="font-medium text-neutral-300 text-xl ml-9  max-md:ml-5 mb-5">
                Top Artists
            </h3>
            <div className="flex flex-wrap justify-between max-md:justify-center max-md:gap-x-2 max-md:px-3 gap-y-8 gap-x-3 px-8">
                {topArtists.map((artist) => (
                    <ArtistCard key={artist.id} artist={artist} />
                ))}
            </div>


        </div>
    )
}

export default TopArtists

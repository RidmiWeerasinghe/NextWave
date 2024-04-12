import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'

function SingleAlbum() {
    const albumID = useParams()
    console.log(albumID)
    const [{accessToken}, dispatch] = useStateValue()

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    useEffect(() => {
        spotify
            .getAlbum(albumID)
            .then(function (data) {
                return data.tracks.map(function (t) {
                    return t.id;
                });
            })
            .then(function (trackIds) {
                return spotifyApi.getTracks(trackIds);
            })
            .then(function (tracksInfo) {
                console.log(tracksInfo);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [])
    return (
        <div className={"bg-darkBlue  overflow-hidden "}>
            
        </div>
    )
}

export default SingleAlbum

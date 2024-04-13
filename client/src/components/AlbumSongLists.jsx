import React, { useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import { cTrack } from '../dummyData/dummy'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'

function AlbumSongLists(trackID) {

    const [{ accessToken }, dispatch] = useStateValue()
    const [track, setTrack] = useState(cTrack)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)



    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    useEffect(() => {
        var authParameters = {
            method: 'GET',
            mode: "cors",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }
        fetch(`https://api.spotify.com/v1/tracks/${trackID.trackID}`, authParameters)
            .then(result => result.json())
            .then(data => setTrack(data)
            ).catch(console.error("err"))
    }, [])
    console.log(track)
    return (
        <div className="w-full overflow-hidden max-md:px-0 flex flex-col gap-2 text-white px-2.1">
            <div className='p-2 m-2 rounded-lg flex 'style={{ backgroundColor: 'rgba(169,169,169,0.05)' }}>
                <img src={track.album.images[0].url} alt="" className='w-14 h-14 rounded-sm' />
                <h4>{track.name}</h4>
                <h4>{millisToMinutesAndSeconds(track.duration_ms)}</h4>
                <PlayCircleOutlineIcon />
            </div>
        </div>
    )
}

export default AlbumSongLists

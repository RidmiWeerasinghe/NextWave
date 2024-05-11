import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useStateValue } from '../StateProvider'


function Player(props) {
    //const trackUrl = `https://open.spotify.com/embed/track/${props.trackID}?utm_source=generator&theme=0&autoplay=true`
    const trackUri = `spotify:track:3vkCueOmm7xQDoJ17W1Pm3`
    const [{ accessToken }, dispatch] = useStateValue()

    if(!accessToken){
        return null
    }
    console.log("rendering player.......")
    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            uris={trackUri? [trackUri]:[]}
        />
        // <div style={{ position: 'fixed', bottom: -55, width: '100%', zIndex: 999}}>
        //     <iframe
        //         className='w-full h-2/4'
        //         src={trackUrl}
        //         frameBorder="0"
        //         allowFullScreen=""
        //         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        //         loading="lazy"
        //     ></iframe>
        // </div>


    )
}

export default Player

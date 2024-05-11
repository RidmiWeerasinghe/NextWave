import React, { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useStateValue } from '../StateProvider'


function Player(props) {
    //const trackUrl = `https://open.spotify.com/embed/track/${props.trackID}?utm_source=generator&theme=0&autoplay=true`
    const trackUri = props.uri
    console.log(trackUri)
    const [{ accessToken }, dispatch] = useStateValue()
    if (!accessToken) {
        return null
    }
    console.log("rendering player.......")



    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 999, boxShadow: '0 -2px 4px rgba(255, 255, 255, 0.1)' }}>
            <SpotifyPlayer
                token={accessToken}
                uris={trackUri ? trackUri : []}
                play={true}
                styles={{
                    bgColor: '#1e2126',
                    color: '#e7e5e4',
                    loaderColor: '#fff',
                    sliderColor: '#e7e5e4',
                    savedColor: '#fff',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                    sliderHandleColor: '#e7e5e4',
                }}
            />
        </div>
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

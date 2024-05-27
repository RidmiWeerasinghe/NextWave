import React from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useStateValue } from '../StateProvider'
import toast from 'react-hot-toast'


function Player() {
    const [{ accessToken, currentPlayingTrackUri }, dispatch] = useStateValue()
    if (!accessToken) {
        return null
    }
    //const trackUrl = `https://open.spotify.com/embed/track/${props.trackID}?utm_source=generator&theme=0&autoplay=true`

    const trackUri = currentPlayingTrackUri
    
    //const trackUri = ['spotify:track:7xoUc6faLbCqZO6fQEYprd', 'spotify:track:3cysp2UU6xmV61ZlnQsa8s', 'spotify:track:5sPaFuUttXaGeMhq1HKJG5', 'spotify:track:64tcymNxzRAgcytMFjb3GD', 'spotify:track:3h4T9Bg8OVSUYa6danHeH5', 'spotify:track:360Wr96ywrCQq4kTAJ8Pq6', 'spotify:track:2qSkIjg1o9h3YT9RAgYN75', 'spotify:track:4S6fv0puLCsfYjyBTPDb9k', 'spotify:track:3rAyyKRZMj6b77vebFgxKd', 'spotify:track:4R8BdwRidxAWaYyFNU00P1']
    console.log(trackUri)

    console.log("rendering player.......")

    if (!trackUri) {
        toast.error("select a song to play")
        return null
    }

    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 999, boxShadow: '0 -2px 4px rgba(255, 255, 255, 0.1)' }}>
            <SpotifyPlayer
                token={accessToken}
                uris={trackUri ? [trackUri] : []}
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
            <h1 className=' text-white'>{trackUri[0] ? "yes" : "no"}</h1>
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

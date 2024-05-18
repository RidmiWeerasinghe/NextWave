import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import { cTrack } from '../dummyData/dummy'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import Popover from '@mui/material/Popover'
import ListItemButton from '@mui/material/ListItemButton'
import AddIcon from '@mui/icons-material/Add'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import PauseIcon from '@mui/icons-material/Pause'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function AlbumSongLists(trackID) {

    //console.log(trackID)
    const [{ user, accessToken, pageRefresh, currentPlayingTrackId }, dispatch] = useStateValue()
    const [track, setTrack] = useState(cTrack)
    const [isFavorite, setIsFavorite] = useState(false)
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState([{ name: "" }])
    let isPlaying = false


    console.log(trackID.trackID)

    //check if the song is playing
    if(currentPlayingTrackId === trackID.trackID){
        isPlaying = true
    }

    //popover
    const [anchorEl, setAnchorEl] = React.useState(null)

    //getting from the props
    const removeBtnVisible = trackID.removeBtnVisible ? trackID.removeBtnVisible : false
    //to remove a song, the name of the playlist should be there
    const playlistName = trackID.playlistName ? trackID.playlistName : ""

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    //popover
    const handleClickPlaylistIcon = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    //converting ms to mins and secs
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    const handleRemoveSong = () => {
        const email = user.email
        const name = playlistName
        const songid = trackID.trackID

        axios.delete(`http://localhost:5555/playlist/removefromplalist/${email}/${name}/${songid}`)
            .then(response => {
                if (response.data === "deleted") {
                    toast.success("Song removed from the playlist")
                    setTimeout(() => {
                        dispatch({
                            type: 'SET_PAGEREFRESH',
                            pageRefresh: !pageRefresh
                        })
                    }, 800)
                    console.log(songid + " is removed ")
                }
                else {
                    toast.error("delete fail")
                }
            })
            .catch((error) => {
                console.log(error.message)
                toast.error("something went wrong")
            })
    }

    useEffect(() => {
        //loading all playlists
        if (user.username) {
            try {
                axios.get(`http://localhost:5555/playlist/getallplaylist/${user.email}`)
                    .then(response => {
                        //console.log(response.data.data)
                        setCurrentUserPlaylists(response.data.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log("no user")
        }
    }, [])

    //retreving track by track using track id
    useEffect(() => {
        
        if (trackID.trackID !== "id" && trackID.trackID) {
            console.log(trackID.trackID)
            try {
                var authParameters = {
                    method: 'GET',
                    mode: "cors",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                }
                fetch(`https://api.spotify.com/v1/tracks/${trackID.trackID}`, authParameters)
                    .then(result => result.json())
                    .then(data => {
                        //if there isn't an error
                        console.log(data)
                        if (data.album) {
                            setTrack(data)
                        }
                    }
                    )
                    .catch((error) => {
                        console.log(error)
                        console.log("error")
                    })
            } catch (error) {
                console.log(error)
            }
        }
    }, [])
    // console.log("track")
    // console.log(cTrack.album.images[0])
    // console.log(track)

    function addToPlaylist(event, playlist) {
        const songID = trackID.trackID
        const name = playlist.name
        const email = user.email

        //adding song to playlist
        try {
            axios.post(`http://localhost:5555/playlist/addtoplaylist/${email}/${name}/${songID}`)
                .then(response => {
                    if (response.data == "updated") {
                        toast.success("Song is added to playlist")
                        console.log(songID + " is added")
                    }
                    else {
                        toast.error(response.data)
                    }
                })
                .catch((error) => {
                    toast.error(error.response.data)
                    console.log(error)
                })
        } catch (error) {
            console.log(error.message)
        }
    }

    //find the favorite sts
    if (user.username) {
        try {
            axios.get(`http://localhost:5555/songs/checkfavorite/${user.email}/${trackID.trackID}`)
                .then(response => {
                    if (response.data === "true") {
                        setIsFavorite(true)
                    }
                    else {
                        setIsFavorite(false)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }
    }

    //setting favorite songs
    const setFavourite = () => {
        if (user.username) {
            try {
                axios.put(`http://localhost:5555/songs/setfavorite/${trackID.trackID}`, { email: user.email })
                    .then(response => {
                        if (response.data === "added") {
                            toast.success("Song added to favorites")
                        }
                        else if (response.data == "removed") {
                            toast.success("Song removed from favorites")
                        }
                        dispatch({
                            type: 'SET_PAGEREFRESH',
                            pageRefresh: !pageRefresh
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            toast.error("Login to add to favorites")
        }
    }


    const handlePlay = () => {
        const trackid = trackID.trackID
        let currentUserEmail = user.email
        console.log("play song : " + trackID)


        //getting track uri
        try {
            var authParameters = {
                method: 'GET',
                mode: "cors",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            }
            fetch(`https://api.spotify.com/v1/tracks/${trackid}`, authParameters)
                .then(result => result.json())
                .then(data => {
                    //if there isn't an error
                    console.log(data)
                    if (data.album) {
                        //setting the music player
                        dispatch({
                            type: 'SET_CURRENTPLAYINGTRACKURI',
                            currentPlayingTrackUri: [data.uri]
                        })
                        dispatch({
                            type: 'SET_CURRENTPLAYINGTRACKID',
                            currentPlayingTrackId: data.id
                        })
                    }
                }
                )
                .catch((error) => {
                    console.log(error)
                    console.log("error")
                })
        } catch (error) {
            console.log(error)
        }

        if (currentUserEmail) {

            //check if user has a history
            axios.post('http://localhost:5555/history/check', { email: currentUserEmail })
                .then(response => {
                    console.log(response)

                    //adding to history
                    axios.post('http://localhost:5555/history/add', { email: currentUserEmail, trackID: trackid })
                        .then(response => {
                            console.log(response.data.message)
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    const handlePause = () =>{
        isPlaying = false
        dispatch({
            type: 'SET_CURRENTPLAYINGTRACKURI',
            currentPlayingTrackUri: []
        })
        dispatch({
            type: 'SET_CURRENTPLAYINGTRACKID',
            currentPlayingTrackId: ""
        })
    }


    return (
        <div className="w-full overflow-hidden max-md:px-0 flex flex-col gap-2 text-white px-2.1 cursor-pointer" onClick={() => { console.log(trackID) }}>
            <div className='p-5 m-2 rounded-lg flex items-center justify-between bg-playlistcardbg  hover:bg-playlistcardhoverbg'>
                <div className="flex items-center space-x-4">
                    <img src={track.album.images[0].url} alt="" className='w-14 h-14 rounded-sm' />
                    <div>
                        <h4 className="text-base font-semibold">{track.name}</h4>
                        <h6 className="text-sm text-gray-500">{track.album.artists[0].name} | {track.album.name}</h6>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    {!isFavorite && <FavoriteBorderIcon className='cursor-pointer' onClick={setFavourite} />}
                    {isFavorite && <FavoriteIcon className='cursor-pointer text-red-600' onClick={setFavourite} />}
                    <h4 className="text-base font-semibold">{millisToMinutesAndSeconds(track.duration_ms)}</h4>
                    <div className='text-xl cursor-pointer' >{isPlaying ? <PauseIcon style={{ fontSize: 35 }} onClick={handlePause}/> : <PlayArrowRoundedIcon style={{ fontSize: 35 }} onClick={handlePlay}/>}</div>


                    {user.email && !removeBtnVisible && <div className='text-xl cursor-pointer' onClick={handleClickPlaylistIcon}><MoreVertIcon style={{ fontSize: 30 }} aria-describedby={id} /></div>}
                    {user.email && <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        PaperProps={{
                            sx: {
                                backgroundColor: "#282a2e",
                                paddingY: 1,
                                borderRadius: 3,
                                overflow: "visible",
                                width: "15rem",
                            },
                        }}

                    >
                        <ListItemButton>
                            <li className="flex gap-3 items-center text-neutral-200 py-1 font-normal text-sm cursor-default">
                                <AddIcon />
                                <p className="tracking-wider">Add to playlist</p>
                            </li>
                        </ListItemButton>
                        {currentUserPlaylists.length > 0 &&
                            currentUserPlaylists.map((playlist) => (
                                <ListItemButton key={playlist.name} onClick={(event) => addToPlaylist(event, playlist)}>
                                    <li className="flex gap-3 text-neutral-200 py-1 font-normal text-sm">
                                        <MusicNoteIcon />
                                        <p className="tracking-wider">{playlist.name}</p>
                                    </li>
                                </ListItemButton>))}
                        {currentUserPlaylists.length == 0 &&
                            <ListItemButton>
                                <Link to='/myplaylists'>
                                    <li className="flex gap-3 text-neutral-200 py-1 font-normal text-sm">
                                        <CreateNewFolderIcon />
                                        <p className="tracking-wider">Create playlist</p>
                                    </li>
                                </Link>
                            </ListItemButton>}
                    </Popover>}

                    {removeBtnVisible && <div className='text-xl cursor-pointer' onClick={handleRemoveSong}><RemoveCircleIcon style={{ fontSize: 25 }} /></div>}
                </div>
            </div>
            {/* {play && <iframe className=' w-full h-2/4'  src={trackUrl}  frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>} */}
        </div>
    )
}

export default AlbumSongLists

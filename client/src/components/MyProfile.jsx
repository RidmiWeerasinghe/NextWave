import React, { useState, useEffect } from 'react'
import { useStateValue } from '../StateProvider'
import EditIcon from '@mui/icons-material/Edit'
import PlaylistCard from './PlaylistCard'
import AlbumSongLists from './AlbumSongLists'
import SpotifyWebApi from 'spotify-web-api-js'
import axios from 'axios'
import arrayShuffle from 'array-shuffle'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, RadialBarChart, RadialBar, PieChart, Pie } from 'recharts'
import { currentUserPlaylistsInDummy } from '../dummyData/dummy'
import { Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function MyProfile() {
    const [{ user, accessToken, mood, pageRefresh, favoriteTracks, hidePlayer }, dispatch] = useStateValue()
    const [currentUserPlaylists, setCurrentUserPlaylists] = useState(currentUserPlaylistsInDummy)
    const [suggestSongs, setSuggestSongs] = useState([])
    const [showSuggetions, setShowSuggetions] = useState(false)
    const [moodPlaylistId, setMoodPlaylistId] = useState("")
    const [mostPlayedSongs, setMostPlayedSongs] = useState([])
    const [noOfPlaylists, setNoOfPlaylists] = useState(user?.playlist.length)

    

    const colors = [
        "#ff0000", // Red
        "#ff5733", // Red-Orange
        "#ff8d1a", // Orange
        "#ffbf00", // Yellow-Orange
        "#ffff00", // Yellow
        "#caff70", // Light Green
        "#82ca9d", // Green
        "#8dd1e1", // Light Blue
        "#83a6ed", // Blue
        "#8884d8"  // Shade of Blue
    ];
    //shuffle array
    const shuffledArray = arrayShuffle(mostPlayedSongs)
    const chartsData = shuffledArray.map((track, index) => (
        ({
            "name": track.name + " - " + track.artist,
            "Number of times played": track.count,
            "fill": colors[index % colors.length]
        })
    ))

    //graph customize
    const getPath = (x, y, width, height) => (
        `M${x},${y + height}
         C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
         C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
         Z`
    )
    const TriangleBar = (props) => {
        const {
            fill, x, y, width, height,
        } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    }


    // console.log("currentUserPlaylists")
    // console.log(user.username)

    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    //getting favorites
    useEffect(() => {
        console.log("getting favorites")
        if (user.email) {
            axios.get(`http://localhost:5555/songs/getallfavourites/${user.email}`)
                .then(response => {
                    // console.log("response.data")
                    // console.log(response.data)
                    const tracks = response.data.tracks
                    dispatch({
                        type: 'SET_FAVORITETRACKS',
                        favoriteTracks: tracks.reverse()
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [pageRefresh])

    //loading all playlists
    useEffect(() => {
        if (user.username) {
            axios.get(`http://localhost:5555/playlist/getallplaylist/${user.email}`)
                .then(response => {
                    console.log(response.data.count)
                    setNoOfPlaylists(response.data.count)
                    setCurrentUserPlaylists(response.data.data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        else {
            console.log("no user")
        }
    }, [user, pageRefresh])

    //get most played songs
    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5555/history/mostplayed/${user.email}`)
                .then(response => {
                    //console.log(response.data.data)
                    setMostPlayedSongs(response.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [pageRefresh])

    const getSongForMoood = (e) => {
        setShowSuggetions(pre => !pre)
        const mood = e.target.name
        if (accessToken) {
            switch (mood) {
                case "good":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "😃"
                    })
                    setMoodPlaylistId("37i9dQZF1EIgG2NEOhqsD7")
                    spotify.getPlaylist("37i9dQZF1EIgG2NEOhqsD7")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                case "sad":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "😢"
                    })
                    setMoodPlaylistId("37i9dQZF1EIhmSBwUDxg84")
                    spotify.getPlaylist("37i9dQZF1EIhmSBwUDxg84")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                case "angry":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "😡"
                    })
                    setMoodPlaylistId("37i9dQZF1EIgNZCaOGb0Mi")
                    spotify.getPlaylist("37i9dQZF1EIgNZCaOGb0Mi")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                case "happy":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "😋"
                    })
                    setMoodPlaylistId("37i9dQZF1EVJSvZp5AOML2")
                    spotify.getPlaylist("37i9dQZF1EVJSvZp5AOML2")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                case "sleepy":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "😴"
                    })
                    setMoodPlaylistId("37i9dQZF1E8KSuYNloCGgq")
                    spotify.getPlaylist("37i9dQZF1E8KSuYNloCGgq")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                case "romantic":
                    dispatch({
                        type: 'SET_MOOD',
                        mood: "🥰"
                    })
                    setMoodPlaylistId("37i9dQZF1EVGJJ3r00UGAt")
                    spotify.getPlaylist("37i9dQZF1EVGJJ3r00UGAt")
                        .then(function (data) {
                            //console.log(data.tracks.items)
                            const firstFiveItems = data.tracks.items.slice(0, 5)
                            setSuggestSongs(firstFiveItems)
                        }, function (err) {
                            console.error(err)
                        })
                    break
                default:
                    console.log("no playlist")
                    break
            }
        }
    }


    //converting date format in to 2024-05-12
    const convertDateFormat = () => {

        const date = new Date(user.createdAt)

        // Extracting date parts
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0')// Adding 1 to month since it's zero-based
        const day = String(date.getDate()).padStart(2, '0')

        // Forming the desired date string
        const formattedDate = `${year}-${month}-${day}`
        return formattedDate
    }
console.log(convertDateFormat())
    return (
        <div className={`bg-darkBlue `} style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
            <Toaster />
            <div className='bg-darkBlue overflow-y-scroll scrollbar scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-darkBlue pb-10' style={{ height: `${hidePlayer ? "88vh" : "76vh"}` }}>
                <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7">
                    <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                        <img className="w-56 h-56 rounded-full" src={user.imageUrl ? user.imageUrl : "/images/user.jpg"} />

                        <div className="flex place-content-center max-md:place-items-center flex-col">
                            <h2
                                className="font-bold text-6xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                                dangerouslySetInnerHTML={{
                                    __html: `Hello ${user.username}`,
                                }}
                            />

                            <div className="flex max-md:flex-col items-center gap-3 max-md:my-0 max-md:gap-2 my-2 max-md:mt-4">
                                <p
                                    className="text-slate-200 text-sm max-md:text-xs max-md:text-center"
                                    dangerouslySetInnerHTML={{
                                        __html: `joined on ${convertDateFormat()}`
                                    }}
                                />
                                <div className="bg-darkTextColor rounded-full w-1 h-1 max-md:hidden"></div>
                                <p className="text-slate-200 text-sm max-md:text-xs">
                                    {noOfPlaylists} playlists
                                </p>
                                <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
                                <p className="text-slate-200 text-sm min-w-fit">
                                    {user?.email}
                                </p>
                                <Link to={'/editprofile'}>
                                    <p className="text-slate-200 text-sm min-w-fit cursor-pointer">
                                        <EditIcon />
                                    </p>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-4 px-7" />

                <section className="flex ml-10 my-6 mt-4 flex-col mr-6">
                    <div className='flex justify-between items-center ml-3'>
                        <h1 className="font-medium text-xl text-lightTextColor my-8">
                            Hi {user.username}, How Are you feeling today?
                        </h1>
                    </div>
                    <div className='flex justify-evenly items-center ml-3 mt-5'>
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/smile.png" name="good" alt="" onClick={getSongForMoood} />
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/love.png" alt="" name="romantic" onClick={getSongForMoood} />
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/shy.png" alt="" name="happy" onClick={getSongForMoood} />
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/sleep.png" alt="" name="sleepy" onClick={getSongForMoood} />
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/sad.png" alt="" name="sad" onClick={getSongForMoood} />
                        <img className=' w-1/12 hover:w-1/6 cursor-pointer transition-all duration-500' src="images/angry.png" alt="" name="angry" onClick={getSongForMoood} />
                    </div>
                    {showSuggetions && (
                        <div className='flex flex-wrap mt-16 justify-between mb-6'>
                            <h4 className="font-medium text-lg text-lightTextColor mx-2">
                                {mood == "😃" ? "It's grate to hear you're feeling ok 😃. Here are some suggestions for you" :
                                    (mood == "😡" ? "Feeling a bit heated? Let's cool down with these tracks 🔥" :
                                        (mood) == "😢" ? "It's okay to feel sad. These songs might bring some comfort 💙" :
                                            (mood) == "😴" ? "Time to relax. These tracks will help you unwind 😴" :
                                                (mood) == "😋" ? "Happiness looks good on you! Enjoy these upbeat tunes 😊" :
                                                    (mood) == "🥰" ? "In the mood for love? Here are some romantic songs just for you 💖" :
                                                        ""
                                    )}
                            </h4>
                            <Link to={`/emotionBasedPlaylist/${moodPlaylistId}`}><h2 className='font-light text-sm text-lightTextColor mr-4 hover:underline cursor-pointer'>view more</h2></Link>
                        </div>)}
                    {showSuggetions && (
                        <div className='flex flex-wrap justify-center'>
                            {suggestSongs && suggestSongs.map((track) => (
                                <div key={track.track.id} className=" w-full">
                                    <AlbumSongLists trackID={track.track.id} />
                                </div>
                            ))}
                        </div>)}
                </section>
                {currentUserPlaylists.length > 0 && <section className="flex ml-10 my-6 mt-10 flex-col mr-6">
                    <div className='flex justify-between items-center ml-3'>
                        <h1 className="font-medium text-xl text-lightTextColor my-4">
                            My Playlists
                        </h1>
                        <Link to={'/myplaylists'}><h2 className='font-light text-sm text-lightTextColor mr-4 hover:underline cursor-pointer'>show all playlists</h2></Link>
                    </div>
                    <div className='flex flex-wrap'>
                        {currentUserPlaylists.slice(0, 2).map((playlist) => (
                            <div key={playlist.id} className="w-1/2">
                                <PlaylistCard playlist={playlist} threedots={false} />
                            </div>
                        ))}
                    </div>
                </section>}

                {currentUserPlaylists.length > 0 &&
                    <section className="flex ml-10 my-6 mt-10 flex-col mr-6 mb-20">
                        <div className='flex justify-between items-center ml-3'>
                            <h1 className="font-medium text-xl text-lightTextColor my-4">
                                My Recently added Favorites ❤️
                            </h1>
                            <Link to={'/myfavorites'}><h2 className='font-light text-sm text-lightTextColor mr-4 hover:underline cursor-pointer'>view all favorites</h2></Link>
                        </div>
                        {favoriteTracks && favoriteTracks.slice(0, 4).map((track) => (
                            <AlbumSongLists trackID={track.songID} key={track.songID} />
                        ))}
                        {!favoriteTracks && <h6 className='text-white pl-20'><i>You haven't added any favorite songs yet !! </i></h6>}

                    </section>}

                {mostPlayedSongs.length > 0 &&
                    <section className="flex ml-10 flex-col mr-6">
                        <div className='flex justify-between items-center ml-3'>
                            <h1 className="font-medium text-xl text-lightTextColor my-5">
                                Top 10 Most played Songs 🎶
                            </h1>
                            <Link to={'/recentsongs'}><h2 className='font-light text-sm text-lightTextColor mr-4 hover:underline cursor-pointer'>view history</h2></Link>
                        </div>
                        <div className='flex flex-wrap justify-center mt-4'>
                            <BarChart
                                width={900}
                                height={400}
                                data={chartsData}>
                                <CartesianGrid strokeDasharray="none" />
                                <XAxis
                                    dataKey="name"
                                    tick={false}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="Number of times played" fill="#6084AB" shape={<TriangleBar />} className=' cursor-pointer' />
                            </BarChart>
                        </div>
                    </section>}

                {!currentUserPlaylists.length && <section className="flex ml-10 my-6 mt-10 flex-col mr-6 items-center">
                    <p className="text-lg text-lightTextColor my-4">
                        Are you new to NextWave ?
                    </p>
                    <p className="text-sm text-lightTextColor my-4">
                        <i>Let's start exploring🎉🎉🎉 !!</i>
                    </p>
                </section>}
            </div>
        </div>
    )
}

export default MyProfile

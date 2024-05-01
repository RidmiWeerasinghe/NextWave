import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import { useLocation, useNavigate } from 'react-router-dom'
import SpotifyWebApi from 'spotify-web-api-js'
import { useStateValue } from '../StateProvider'
import { searchSchema } from '../validation/searchValidation'
import toast, { Toaster } from 'react-hot-toast'

function HandleSideNav() {
    console.log("HandleSideNav")
}

function SearchBar() {
    const [{ accessToken, searchedArtists,searchResultsLoading }, dispatch] = useStateValue()
    const [inputText, setInputText] = useState()

    //find the page
    const location = useLocation()
    const isArtistsPage = location.pathname === '/topartists' || location.pathname === '/searchresultsartists'
    const isAlbumsPage = location.pathname === '/topalbums' || location.pathname == '/searchresultsalbums'
    const isPlaylistPage = location.pathname === '/singleplaylist' || location.pathname === '/searchresultstracks' || location.pathname === '/'

    const navigate = useNavigate()

    //setting the access token
    const spotify = new SpotifyWebApi()
    spotify.setAccessToken(accessToken)

    const handleInputChange = (e) => {
        const searchText = e.target.value
        setInputText(searchText)
    }

    const handleSearch = async () => {
        const searchText = {
            name: inputText
        }
        dispatch({
            type: 'SET_SEARCHRESULTLOADING',
            searchResultsLoading: true
        })
        try {
            
                //validate search text
                await searchSchema.validate(searchText, { abortEarly: false })

            if (isArtistsPage) {
                console.log("searching...")
                console.log(inputText)

                spotify.searchArtists(`${inputText}`)
                    .then(response => {
                        console.log(response)
                        dispatch({
                            type: 'SET_SEARCHEDARTISTS',
                            searchedArtists: response.artists.items
                        })
                        navigate('/searchresultsartists')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }

            if (isAlbumsPage) {
                console.log("searching...")
                console.log(inputText)

                spotify.searchAlbums(`${inputText}`)
                    .then(response => {
                        //console.log(response)
                        dispatch({
                            type: 'SET_SEARCHEDALBUMS',
                            searchedAlbums: response.albums.items
                        })
                        navigate('/searchresultsalbums')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            if (isPlaylistPage) {
                console.log("searching...")
                console.log(inputText)

                spotify.searchTracks(`${inputText}`)
                    .then(response => {
                        //console.log(response)
                        dispatch({
                            type: 'SET_SEARCHEDTRACKS',
                            searchedTracks: response.tracks.items
                        })
                        dispatch({
                            type: 'SET_SEARCHRESULTLOADING',
                            searchResultsLoading: false
                        })
                        navigate('/searchresultstracks')
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        } catch (error) {
            error.inner.forEach((err) => {
                toast.error(err.message)
            })
        }
    }

    //console.log(searchedArtists)

    return (
        <section className="flex items-center searchBarContainer  gap-4 w-96 max-md:w-full rounded-3xl border border-lightTextColor">
            <Toaster/>
            <div className="w-fit hidden max-md:flex" onClick={HandleSideNav}>
                <IconButton>
                    <FormatAlignCenterIcon className="text-slate-200" />
                </IconButton>
            </div>
            <div
                className="flex  items-center w-full focus-within:border-darkTextColor group transition-all duration-400 ease-linear rounded-full pl-5 pr-1 h-10 normaic border-[#ffd4d46e]"

            >
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder={isArtistsPage && "Type artist's name here" || isAlbumsPage && "Type album name here" || isPlaylistPage && "Type song name here"}
                    className=" placeholder:text-sm bg-transparent placeholder:bg-transparent max-md:placeholder:text-xs text-sm w-full outline-none border-none  text-darkTitle font-light"
                />
                <div className="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100  transition-all duration-200 ease-linear"></div>
                <div className="bg-lightTextColor rounded-full  px-[6px] py-[6px] translate-x-[3px] hover:opacity-80 ">
                    <SearchIcon className="text-darkBlueS cursor-pointer" onClick={handleSearch} />
                </div>
                
            </div>

        </section>
    )
}

export default SearchBar

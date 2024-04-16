import { currentAlbum, currentAtist, currentAtistTracks, topArtists } from './dummyData/dummy.js'

export const initialState = {
    user: {loggedIn:false},
    accessToken: "",
    trendingAlbums: [],
    currentSingleAlbum: currentAlbum,
    topAlbums: [],
    topArtists: topArtists,
    currentAtist: currentAtist,
    currentAtistTracks: currentAtistTracks
}

const reducer = (state, action) => {
    //console.log(action)

    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            }
        case 'SET_TRENDINGALBUMS':
            return {
                ...state,
                trendingAlbums: action.trendingAlbums
            }
        case 'SET_TOPALBUMS':
            return {
                ...state,
                topAlbums: action.topAlbums
            }
        case 'SET_CURRENTSINGLEALBUM':
            return {
                ...state,
                currentSingleAlbum: action.currentSingleAlbum
            }
        case 'SET_TOPARTISTS':
            return {
                ...state,
                topArtists: action.topArtists
            }
        case 'SET_CURRENTARTIST':
            return {
                ...state,
                currentAtist: action.currentAtist
            }
        case 'SET_CURRENTARTISTTRACKS':
            return {
                ...state,
                currentAtistTracks: action.currentAtistTracks
            }
        default:
            return state;
    }
}
export default reducer
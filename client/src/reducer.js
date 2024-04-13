import {currentAlbum,artists} from './dummyData/dummy.js'

export const initialState = {
    accessToken: "",
    trendingAlbums: [],
    currentSingleAlbum: currentAlbum,
    topAlbums: [],
    topArtists:artists
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
        default:
            return state;
    }
}
export default reducer
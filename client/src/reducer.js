import { currentAlbum, currentAtist, currentAtistTracks, currentUserPlaylistsInDummy, playlistFromApi, topArtists, trendingAlbums } from './dummyData/dummy.js'

export const initialState = {
    user: { loggedIn: false, username: "", playlist: [] },
    authCode: "",
    accessToken: "",
    trendingAlbums: trendingAlbums,
    currentSingleAlbum: currentAlbum,
    topAlbums: [],
    topArtists: topArtists,
    currentAtist: currentAtist,
    currentAtistTracks: currentAtistTracks,
    showCreatePlaylistWindow: false,
    showEditPlaylistWindow: false,
    showDeletePlaylistWindow: false,
    currentUserPlaylists: currentUserPlaylistsInDummy,
    currentPlaylistsSpotify: playlistFromApi,
    searchedArtists: topArtists,
    searchedAlbums: trendingAlbums,
    searchedTracks: currentUserPlaylistsInDummy,
    searchedUserPlaylist: "",
    pageRefresh: false,
    searchResultsLoading: false,
    currentPlayingTrackUri: [],
    currentPlayingTrackId: "",
    mood: "",
    favoriteTracks: [],
    isSongPlaying: false,
    hidePlayer: false,
    isSidebarVisible: true
}

const reducer = (state, action) => {
    //console.log(action)

    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'SET_TOKEN':
            return {
                ...state,
                accessToken: action.accessToken
            }
        case 'SET_AUTHCODE':
            return {
                ...state,
                authCode: action.authCode
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
        case 'SET_SHOWCREATEPLAYLISTWINDOW':
            return {
                ...state,
                showCreatePlaylistWindow: action.showCreatePlaylistWindow
            }
        case 'SET_SHOWEDITPLAYLISTWINDOW':
            return {
                ...state,
                showEditPlaylistWindow: action.showEditPlaylistWindow
            }
        case 'SET_SHOWDELETEPLAYLISTWINDOW':
            return {
                ...state,
                showDeletePlaylistWindow: action.showDeletePlaylistWindow
            }
        case 'SET_CURRENTUSERPLAYLIST':
            return {
                ...state,
                currentUserPlaylists: action.currentUserPlaylists
            }
        case 'SET_PAGEREFRESH':
            return {
                ...state,
                pageRefresh: action.pageRefresh
            }
        case 'SET_CURRENTPLAYLISTSPOTIFY':
            return {
                ...state,
                currentPlaylistsSpotify: action.currentPlaylistsSpotify
            }
        case 'SET_SEARCHEDARTISTS':
            return {
                ...state,
                searchedArtists: action.searchedArtists
            }
        case 'SET_SEARCHEDALBUMS':
            return {
                ...state,
                searchedAlbums: action.searchedAlbums
            }
        case 'SET_SEARCHEDTRACKS':
            return {
                ...state,
                searchedTracks: action.searchedTracks
            }
        case 'SET_SEARCHRESULTLOADING':
            return {
                ...state,
                searchResultsLoading: action.searchResultsLoading
            }
        case 'SET_SEARCHEDUSERPLAYLIST':
            return {
                ...state,
                searchedUserPlaylist: action.searchedUserPlaylist
            }
        case 'SET_CURRENTPLAYINGTRACKURI':
            return {
                ...state,
                currentPlayingTrackUri: action.currentPlayingTrackUri
            }
        case 'SET_CURRENTPLAYINGTRACKID':
            return {
                ...state,
                currentPlayingTrackId: action.currentPlayingTrackId
            }
        case 'SET_MOOD':
            return {
                ...state,
                mood: action.mood
            }
        case 'SET_FAVORITETRACKS':
            return {
                ...state,
                favoriteTracks: action.favoriteTracks
            }
        case 'SET_ISSONGPLAYING':
            return {
                ...state,
                isSongPlaying: action.isSongPlaying
            }
        case 'SET_HIDEPLAYER':
            return {
                ...state,
                hidePlayer: action.hidePlayer
            }
        case 'SET_ISSIDENAVVISIBLE':
            return {
                ...state,
                isSidebarVisible: action.isSidebarVisible
            }
        default:
            return state;
    }
}
export default reducer
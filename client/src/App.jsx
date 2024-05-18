import Home from './components/Home'
import Login from './components/LoginPage'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
import SingleAlbum from './components/SingleAlbum'
import TopArtists from './components/TopArtists'
import SingleArtist from './components/SingleArtist'
import Recent from './components/Recent'
import MyPlaylists from './components/MyPlaylists'
import MyFavorites from './components/MyFavorites'
import MyProfile from './components/MyProfile'
import EditProfile from './components/EditProfile'
import UserSinglePlaylist from './components/UserSinglePlaylist'
import TopPlaylists from './components/TopPlaylists'
import SinglePlaylist from './components/SinglePlaylist'
import SearchResultsArtists from './components/SearchResultsArtists'
import SearchResultsAlbums from './components/SearchResultsAlbums'
import SearchResultsTracks from './components/SearchResultsTracks'
import About from './components/About'
import EmotionBasedPlaylist from './components/EmotionBasedPlaylist'
import SpotifyAuth from './components/SpotifyAuth'
import { Routes, Route, useLocation } from 'react-router-dom'
import Player from './components/Player'
import { useStateValue } from './StateProvider'

function App() {
  const [{ currentPlayingTrackUri }, dispatch] = useStateValue()
  const Location = useLocation()
  const isLoginRoute = Location.pathname === '/login'
  const isRegisterRoute = Location.pathname === '/register'
  return (
    <main>
      {!isLoginRoute && !isRegisterRoute && <TopNav />}
      {!isLoginRoute && !isRegisterRoute && <SideNav />}

      <Routes>
        <Route path="/" element={<SpotifyAuth />} />
        <Route path="/singleplaylist" element={<SinglePlaylist />} />
        <Route path="/topalbums" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singlealbum/:id" element={<SingleAlbum />} />
        <Route path="/singleartist/:id" element={<SingleArtist />} />
        <Route path="/singleuserplaylist/:name" element={<UserSinglePlaylist />} />
        <Route path="/singleplaylist" element={<SinglePlaylist />} />
        <Route path="/topartists" element={<TopArtists />} />
        <Route path="/topplaylists" element={<TopPlaylists />} />
        <Route path="/recentsongs" element={<Recent />} />
        <Route path="/myplaylists" element={<MyPlaylists />} />
        <Route path="/myfavorites" element={<MyFavorites />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/searchresultsartists" element={<SearchResultsArtists />} />
        <Route path="/searchresultstracks" element={<SearchResultsTracks />} />
        <Route path="/about" element={<About />} />
        <Route path="/searchresultsalbums" element={<SearchResultsAlbums />} />
        <Route path="/emotionBasedPlaylist/:id" element={<EmotionBasedPlaylist />} />
        <Route path="/callback" element={<PageNotFound />} />
        <Route path="*" element={<div>xxxxx</div>} />
      </Routes>
      <div className={isLoginRoute || isRegisterRoute ? 'hidden' : ''}>
        <Player uri={currentPlayingTrackUri} />
      </div>
    </main>
  )
}

export default App

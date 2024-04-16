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
import { Routes, Route, useLocation } from 'react-router-dom'

function App() {
  const Location = useLocation()
  const isLoginRoute = Location.pathname === '/login'
  const isRegisterRoute = Location.pathname === '/register'
  return (
    <main>
      {!isLoginRoute && !isRegisterRoute && <TopNav />}
      {!isLoginRoute && !isRegisterRoute && <SideNav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/singlealbum/:id" element={<SingleAlbum />} />
        <Route path="/singleartist/:id" element={<SingleArtist />} />
        <Route path="/topartists" element={<TopArtists />} />
        <Route path="/recentsongs" element={<Recent />} />
        <Route path="/myplaylists" element={<MyPlaylists />} />
        <Route path="/myfavorites" element={<MyFavorites />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </main>
  )
}

export default App

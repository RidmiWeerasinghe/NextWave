import Home from './components/Home'
import Login from './components/LoginPage'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import TopNav from './components/TopNav'
import SideNav from './components/SideNav'
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>

    </main>
  )
}

export default App

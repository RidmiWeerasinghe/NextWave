import React from 'react'
import SearchBar from './SearchBar'
import { useStateValue } from '../StateProvider'
import LoginAndSignUp from './LoginAndSignUp'
import ListItemButton from '@mui/material/ListItemButton'
import Popover from '@mui/material/Popover'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import { Link, useLocation } from 'react-router-dom'
import SideNavFloatingButton from './SideNavFloatingButton'

function TopNav() {
  const [{ user, mood, currentUserPlaylists, isSidebarVisible }, dispatch] = useStateValue()
  //popover
  const [anchorEl, setAnchorEl] = React.useState(null)

  //display searchbar
  const Location = useLocation()
  const isArtists = Location.pathname === '/topartists'
  const isArtistsSearch = Location.pathname === '/searchresultsartists'
  const isSongs = Location.pathname === '/singleplaylist' || Location.pathname === '/' || Location.pathname === '/callback'
  const isSongsSearch = Location.pathname === '/searchresultstracks'
  const isAlbums = Location.pathname === '/topalbums'
  const isAlbumsSearch = Location.pathname === '/searchresultsalbums'
  const isUserPlaylists = Location.pathname === '/myplaylists'

  //popover
  const showPopover = (e) => {
    setAnchorEl(e.currentTarget);
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const signout = () => {
    dispatch({
      type: 'SET_USER',
      user: {}
    })
    dispatch({
      type: 'SET_CURRENTUSERPLAYLIST',
      currentUserPlaylists: []
    })
  }

  const myProfile = () => {

  }

  const userLoggendIn = (
    <div className="flex gap-4 items-center mr-0 max-md:hidden"  >
      <div className='text-lightTextColor cursor-pointer p-4' aria-describedby={id} onMouseOver={showPopover}>
        Hi {user.username} {mood ? mood : <SentimentSatisfiedAltIcon className='text-neutral-200' />}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#282a2e",
            paddingY: 1,
            borderRadius: 3,
            overflow: "visible",
            width: "10rem",
            alignItems: "center",
            justifyItems: "center"
          },
        }}
      >
        <Link to={'/myprofile'}>
          <ListItemButton onClick={myProfile}>
            <PersonIcon className='text-neutral-200' />
            <li className="pl-3 flex text-neutral-200 font-normal text-center text-justify">
              <p className="tracking-wider">My Profile</p>
            </li>
          </ListItemButton>
        </Link>
        <Link to={'/singleplaylist'}>
          <ListItemButton onClick={signout}>
            <LogoutIcon className='text-neutral-200' />
            <li className="pl-3 flex text-neutral-200 font-normal text-center text-justify">
              <p
                onClick={signout}
              >
                Sign out
              </p>
            </li>
          </ListItemButton>
        </Link>
      </Popover>
    </div>
  )
  return (
    <div className=" border-b-2 border-slate-100 border-opacity-10 h-20">
      <div className={`h-20 flex items-center pl-9 pr-4 max-md:px-4 justify-between fixed z-40 backdrop-blur-sm bg-darkBlue bg-opacity-60 right-0 left-0 ${isSidebarVisible ? "ml-52":""} max-md:ml-0 top-0`}>
        {!isSidebarVisible && (
          <div className="mr-4">
            <SideNavFloatingButton />
          </div>
        )}
        {isArtists || isSongs || isAlbums || isAlbumsSearch || isArtistsSearch || isSongsSearch || isUserPlaylists ? <SearchBar /> : <></>}
        <div className="flex-grow" />
        <div> {user.username ? userLoggendIn : <LoginAndSignUp />}</div>
      </div>
    </div>
  )
}

export default TopNav

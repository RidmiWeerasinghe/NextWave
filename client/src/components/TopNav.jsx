import React from 'react'
import SearchBar from './SearchBar'
import { useStateValue } from '../StateProvider'
import LoginAndSignUp from './LoginAndSignUp'
import ListItemButton from '@mui/material/ListItemButton'
import Popover from '@mui/material/Popover'

function TopNav() {
  const [{ user }, dispatch] = useStateValue()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const showPopover = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  const signout = () => {
    dispatch({
      type: 'SET_USER',
      user: {}
    })
  }

  const userLoggendIn = (
    <div className="flex gap-4 items-center mr-0 max-md:hidden"  >
      <div className='text-lightTextColor cursor-pointer p-4'aria-describedby={id} onMouseOver={showPopover}>
        Hi {user.username},
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
            justifyItems:"center"
          },
        }}
      >
        <ListItemButton onClick={signout}>
          <li className="flex text-neutral-200 font-normal text-sm text-center text-justify">

            <p className="tracking-wider">My Profile</p>
          </li>
        </ListItemButton>
        <ListItemButton onClick={signout}>
          <li className="flex text-neutral-200 font-normal text-sm text-center text-justify">

            <p
              onClick={signout}
            >
              Sign out
            </p>
          </li>
        </ListItemButton>
      </Popover>
    </div>
  )
  return (
    <div className=" border-b-2 border-slate-100 border-opacity-10 h-20">
      <div className="h-20 flex items-center px-9 max-md:px-4 justify-between fixed z-40 backdrop-blur-sm bg-darkBlue bg-opacity-60 right-0 left-0 ml-52 max-md:ml-0 top-0">
        <SearchBar />
        <div> {user.username ? userLoggendIn : <LoginAndSignUp />}</div>
      </div>
    </div>
  )
}

export default TopNav

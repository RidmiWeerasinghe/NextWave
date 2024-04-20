import React from 'react'
import SearchBar from './SearchBar'
import { useStateValue } from '../StateProvider'
import LoginAndSignUp from './LoginAndSignUp'
import ListItemButton from '@mui/material/ListItemButton'

function TopNav() {
  const [{ user }, dispatch] = useStateValue()

  const signout = () => {
    dispatch({
      type: 'SET_USER',
      user: {}
    })
  }

  const userLoggendIn = (
    <div className="flex gap-8 items-center mr-0 max-md:hidden">
      <div className='text-lightTextColor'>Hi {user.username},</div>
      <ListItemButton
        sx={[
          {
            padding: 0,
          },
        ]}
      >
        <button
          onClick={signout}
          className="bg-lightTextColor hover:opacity-90 text-backgroundColor rounded-md px-3 py-1 tracking-wide"
        >
          SignOut
        </button>
      </ListItemButton>
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

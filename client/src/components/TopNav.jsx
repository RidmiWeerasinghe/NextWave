import React from 'react'
import SearchBar from './SearchBar'
import { useStateValue } from '../StateProvider'
import LoginAndSignUp from './LoginAndSignUp'

function TopNav() {
  const [{ user }, dispatch] = useStateValue()
  const userLoggendIn = (
    <div className='text-lightTextColor'>{user.username}</div>
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

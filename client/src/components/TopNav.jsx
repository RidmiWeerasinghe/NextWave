import React from 'react'
import SearchBar from './SearchBar'
import { useStateValue } from '../StateProvider'

function TopNav() {
  const [{user}, dispatch] = useStateValue()
  //console.log(user)
  //console.log("top nav rendering again")
  return (
    <div className=" border-b-2 border-slate-100 border-opacity-10 h-20">
      <div className="h-20 flex items-center px-9 max-md:px-4 justify-between fixed z-40 backdrop-blur-sm bg-darkBlue bg-opacity-60 right-0 left-0 ml-52 max-md:ml-0 top-0">
        <SearchBar/>
        <h4 className="text-white text-center mb-3 max-md:mb-0 mt-2 max-md:px-2 ">
          login, {user.username}
        </h4>
      </div>
    </div>
  )
}

export default TopNav

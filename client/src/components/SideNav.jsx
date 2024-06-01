import React from 'react'
import LogoText from './LogoText'
import { NavLink, useLocation } from 'react-router-dom'
import AlbumIcon from '@mui/icons-material/Album'
import PersonIcon from '@mui/icons-material/Person'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import HistoryIcon from '@mui/icons-material/History'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import InfoIcon from '@mui/icons-material/Info'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { useStateValue } from '../StateProvider'

function SideNav() {
    const [{ user, hidePlayer }, dispatch] = useStateValue()
    function HandleSideNav() {
        console.log("clicked")
    }

    const location = useLocation()


    return (
        <div className={"float-left w-52 h-[26rem] max-md:w-0 select-none"}>
            <div
                className={
                    "bg-grayBackground text-lightTextColorSideNav top-0  w-52 transition-all duration-200 ease-linear  fixed z-50 h-full  py-10 "
                }
            >
                <section className="px-7 max-md:px-10 ">
                    <section className="scale-105 pb-4">
                        <LogoText />
                    </section>

                    <section className="mt-6">
                        <h3 className="uppercase font-Rubik font-medium tracking-wider max-md:text-lg text-sm">
                            Menu
                        </h3>
                        <ul className="flex flex-col gap-6 mt-5">
                            <NavLink
                                onClick={HandleSideNav}
                                to={"/topalbums"}
                                className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/topalbums" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                            >
                                <AlbumIcon />
                                Albums
                            </NavLink>
                            <NavLink
                                onClick={HandleSideNav}
                                to={"/topartists"}
                                className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/topartists" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                            >
                                <PersonIcon />
                                Artists
                            </NavLink>
                            <NavLink
                                onClick={HandleSideNav}
                                to={"/singleplaylist"}
                                className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/singleplaylist" || location.pathname === "/callback" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                            >
                                <MusicNoteIcon />
                                Songs
                            </NavLink>
                        </ul>
                    </section>
                </section>

                <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />

                <section className="px-7 max-md:px-10">
                    <h3 className="uppercase font-Rubik font-medium tracking-wider text-sm">
                        Library
                    </h3>
                    <ul className="flex flex-col gap-6 mt-5">
                        <NavLink
                            onClick={HandleSideNav}
                            to={"/recentsongs"}
                            className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/recentsongs" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                        >
                            <HistoryIcon />
                            Recent
                        </NavLink>
                        <NavLink
                            onClick={HandleSideNav}
                            to={"/myplaylists"}
                            className={`flex items-center  gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/myplaylists" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                        >
                            <QueueMusicIcon />
                            Your Playlists
                        </NavLink>
                        <NavLink
                            onClick={HandleSideNav}
                            to={"/myfavorites"}
                            className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/myfavorites" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                        >
                            <FavoriteIcon /> Favorites
                        </NavLink>
                        {user.username && <NavLink
                            onClick={HandleSideNav}
                            to={"/myprofile"}
                            className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/myprofile" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                        >
                            <AdminPanelSettingsIcon /> My Profile
                        </NavLink>}
                    </ul>
                </section>
                <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />
                <section className="px-7 max-md:px-10 mt-5">
                    <ul className="flex flex-col gap-6 mt-2">
                        <NavLink
                            onClick={() => {
                                dispatch({
                                    type: 'SET_HIDEPLAYER',
                                    hidePlayer: !hidePlayer
                                })
                            }}
                            className={`flex items-center gap-4 text-sm max-md:text-base font-medium hover:text-lightTextHoverColorSideNav text-${location.pathname === "/about" ? " text-lightTextHoverColorSideNav" : "text-lightTextColorSideNav"}`}
                        >
                            {!hidePlayer ? <VisibilityOffIcon/> : <VisibilityIcon/>}{!hidePlayer ? `Hide Player` : `Show Player`}
                        </NavLink>
                    </ul>
                    {/* <button>Dark</button> */}
                </section>
                <div className="absolute bottom-0  flex justify-center right-0 left-0">
                    <p
                        className="text-xs"
                    >
                        <NavLink to={'/'}>Made by <span className="text-neutral-200">RID_MI❤️</span></NavLink>
                    </p>
                </div>
                {/* {!login_success && (
                    <section className="px-7  mt-10 hidden gap-2 max-md:flex">
                        <RippleButton color={"#519aff2e"} speed={500}>
                            <Link
                                onClick={HandleSideNav}
                                to={"/login"}
                                className="text-white text-lg block hover:opacity-90 bg-[#519aff2e] w-full pl-5 py-3 rounded-md"
                            >
                                Log In
                            </Link>
                        </RippleButton>
                        <RippleButton color={"#959aff8e"} radius={6} speed={500}>
                            <Link
                                onClick={HandleSideNav}
                                to={"/signup"}
                                className="bg-skyBlue bg-opacity-70 block text-lg text-white rounded-md pl-4 py-3  "
                            >
                                Sign up
                            </Link>
                        </RippleButton>
                    </section>
                )} */}
            </div>
            <div
            ></div>
        </div>
    )
}

export default SideNav

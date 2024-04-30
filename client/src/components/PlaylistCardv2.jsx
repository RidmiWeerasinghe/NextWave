import React from 'react'
import { Link } from 'react-router-dom'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'

function PlaylistCard(playlist) {

    // console.log("threedots.threedots")


    // /console.log("playlist")
    // console.log(playlist)

    return (
        <div className=" w-7/12 relative overflow-hidden p-1 ml-2 mb-4 rounded-lg bg-playlistcardbg hover:bg-playlistcardhoverbg">
            <Link
                to={`/singleplaylist/${playlist.playlist.id}`}
                className=" block  hover:bg-opacity-60 mr-3 transition-all duration-300 ease-linear py-[6px] rounded-md px-2"
                style={{ textDecoration: 'none' }}
            >
                <div className="flex overflow-hidden cursor-pointer rounded-md items-center">
                    <div className="flex justify-normal  w-full items-center gap-5 ">
                        <img
                                src={playlist.playlist.images[0].url}
                                alt=""
                                loading="lazy"
                                className=" w-1/5 h-full object-cover rounded-sm"
                            />
                        <div className="">
                            <h3 className="text-neutral-200 tracking-wide text-base">
                                {playlist.playlist.name}
                            </h3>
                            <p className="text-neutral-400 text-xs mt-1">
                               { playlist.playlist.description}
                            </p>
                            <p className="text-neutral-400 text-xs mt-1">
                                {playlist.playlist.tracks.items.length} songs
                            </p>
                        </div>
                        <div className="flex grid place-items-center bg-[#343432] rounded-md p-2 ml-auto">
                            <QueueMusicIcon className="text-neutral-300" style={{ fontSize: 45 }}/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PlaylistCard

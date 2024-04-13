import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ArtistCard(artistID) {
    console.log("artistID : "+ artistID)
    return (
        <Link to={`/artist/`} className="w-28 block group">
            <div className="relative w-48 h-48 border-1 border-opacity-5 border-slate-300 rounded-full overflow-hidden">
                <img
                    src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 ease-linear duration-500"
                />
            </div>
            <h4
                className="w-full text-center text-darkSongname text-sm mt-3 px-1 "
                title="{title}"
            >
                
            </h4>
            <p className="text-center text-slate-400 text-xs tracking-wide mt-1">
                Artist
            </p>
        </Link>
    )
}

export default ArtistCard

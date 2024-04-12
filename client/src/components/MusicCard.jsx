import React from 'react'
import { Link } from 'react-router-dom'

function MusicCard(album) {
  //console.log(album.album)
  const imgUrl = album.album.images[0]?.url
  const albumName = album.album.name
  //console.log(albumName)
  return (
    <div>
      <div className="relative w-40 h-40 group rounded-lg">
        <img
          src={imgUrl}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover rounded-lg"
        />
        <Link
          to={`/singlealbum/${album.album.id}`}
          className="absolute flex z-20 opacity-0 rounded-lg group-hover:opacity-100 duration-200 transition-all inset-0 w-full items-center justify-center bg-[#4c4c4c68] text-3xl cursor-pointer"
        ></Link>
      </div>
      <h4
        className="whitespace-nowrap overflow-hidden text-ellipsis w-28 text-darkSongname text-sm mt-2 px-1"
        title={albumName}
        dangerouslySetInnerHTML={{
          __html: albumName,
        }}
      />
    </div>
  )
}

export default MusicCard

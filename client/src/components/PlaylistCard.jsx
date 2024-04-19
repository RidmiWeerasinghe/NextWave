import React from 'react'

function PlaylistCard(playlist) {
//console.log(playlist)
    return (
        <div className='text-white'>{playlist.playlist.name}</div>
    )
}

export default PlaylistCard

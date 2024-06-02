import React from 'react'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import { useStateValue } from '../StateProvider'

function FloatingButton() {
    const [{ hidePlayer }, dispatch] = useStateValue()

    return (
        <button
            onClick={() => {
                dispatch({
                    type: 'SET_HIDEPLAYER',
                    hidePlayer: !hidePlayer
                })
            }}
            className="fixed bottom-5 right-5 bg-grayBackground text-lightTextColorSideNav p-3 rounded-full shadow-lg hover:bg-lightTextColorSideNav hover:text-darkBlue focus:outline-none "
            style={{boxShadow: '0 -2px 4px rgba(255, 255, 255, 0.1)'}}
            >
            <MusicNoteIcon />
        </button>
    )
}

export default FloatingButton

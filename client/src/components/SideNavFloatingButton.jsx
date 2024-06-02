import React from 'react'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useStateValue } from '../StateProvider'

function SideNavFloatingButton() {
    const [{ isSidebarVisible }, dispatch] = useStateValue()
    return (
        <>
            <style>
                {`
                    .hover\\:shadow-custom:hover {
                        box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
                        transition: box-shadow 0.3s ease-in-out;
                    }
                `}
            </style>
            <button
                className={`${isSidebarVisible ? "absolute bg-grayBackground" : ""} -top-4 right-0  text-lightTextColorSideNav p-3 rounded-full shadow-sm hover:shadow-custom z-44`}
                onClick={() => {
                    dispatch({
                        type: 'SET_ISSIDENAVVISIBLE',
                        isSidebarVisible: !isSidebarVisible
                    })
                }}
            >
                {isSidebarVisible ? <ArrowBackIosIcon style={{ fontSize: '20px' }} /> : <ArrowForwardIosIcon style={{ fontSize: '16px' }} />}
            </button>
        </>
    )
}

export default SideNavFloatingButton

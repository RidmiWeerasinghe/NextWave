import React from 'react'
import { Link } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'

function LoginAndSignUp() {
    return (
        <div className="flex gap-8 items-center mr-0 max-md:hidden">
            <ListItemButton
                sx={[
                    {
                        padding: 0,
                    },
                ]}
            >
                <Link
                    to={"/login"}
                    //className="bg-lightTextColor hover:opacity-90 text-backgroundColor rounded-md px-3 py-1 tracking-wide"
                    className="text-neutral-200 hover:bg-lightTextColor hover:text-backgroundColor bg-backgroundColor rounded-md px-3 py-1 tracking-wide border border-neutral-200 hover:border-none"
                >
                    Sign In
                </Link>
            </ListItemButton>
        </div>
    )
}

export default LoginAndSignUp

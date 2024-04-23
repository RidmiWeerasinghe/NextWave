import React ,{useState}from 'react'
import { Link } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Popover from '@mui/material/Popover'
import ListItemButton from '@mui/material/ListItemButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import {useStateValue} from '../StateProvider'
import DeletePlaylistWindow from './DeletePlaylistWindow'
import EditPlaylistWindow from './EditPlaylistWindow'

function PlaylistCard(playlist) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [{showDeletePlaylistWindow, showEditPlaylistWindow}, dispatch] = useStateValue()

    const handleClick = () => {
        console.log("handle click")
    }
    const handleEdit = () => {
        console.log("handle click")
        dispatch({
            type:'SET_SHOWEDITPLAYLISTWINDOW',
            showEditPlaylistWindow:true
        })
    }
    const handleDelete = () => {
        console.log(playlist.playlist.id)
        console.log("handle click")
        dispatch({
            type:'SET_SHOWDELETEPLAYLISTWINDOW',
            showDeletePlaylistWindow:true
        })
    }

    const handle3dotsClick = (e) => {
        setAnchorEl(e.currentTarget)
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div className="relative overflow-hidden p-3 m-2 rounded-lg bg-playlistcardbg hover:bg-playlistcardhoverbg">
            <Link
                to={`/`}
                className=" block  hover:bg-opacity-60 mr-3 transition-all duration-300 ease-linear py-[10px] rounded-md px-4"
                style={{ textDecoration: 'none' }}
            >
                <div className="flex overflow-hidden cursor-pointer   rounded-md items-center">
                    <div className="flex  w-full items-center gap-5 ">
                        <div className="grid place-items-center bg-[#343432] rounded-md p-2">
                            <MusicNoteIcon className="text-neutral-300" />
                        </div>
                        <div className="">
                            <h3 className="text-neutral-200 tracking-wide text-base">
                                {playlist.playlist.name}
                            </h3>
                            <p className="text-neutral-400 text-xs mt-1">
                                {playlist.playlist.songs.length} songs
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
            <section
                className="absolute right-2 top-0 bottom-0 grid place-items-center   z-10"
                onClick={handle3dotsClick}
            >
                <IconButton size="large">
                    <MoreVertIcon className="text-neutral-400" aria-describedby={id} />
                </IconButton>
            </section>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "center",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        backgroundColor: "#282a2e",
                        paddingY: 1,
                        borderRadius: 3,
                        overflow: "visible",
                        width: "10rem",
                    },
                }}
            >
                <ListItemButton onClick={handleEdit}>
                    <li className="flex gap-3 items-center text-neutral-200 py-1 font-normal text-sm">
                        <EditIcon />
                        <p className="tracking-wider">Rename</p>
                    </li>
                </ListItemButton>
                <ListItemButton onClick={handleDelete}>
                    <li className="flex gap-3 text-neutral-200 py-1 font-normal text-sm">
                        <DeleteIcon />
                        <p className="tracking-wider">Delete</p>
                    </li>
                </ListItemButton>

                {showEditPlaylistWindow && (
                        <EditPlaylistWindow name={playlist.playlist.name}/>
                    )}
                    {showDeletePlaylistWindow && (
                        <DeletePlaylistWindow name={playlist.playlist.name}
                        />
                    )}
                
            </Popover>
        </div>
    )
}

export default PlaylistCard

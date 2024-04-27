import React from 'react'
import { useStateValue } from '../StateProvider'
import EditIcon from '@mui/icons-material/Edit'

function MyProfile() {
    const [{ user }, dispatch] = useStateValue()

    return (
        <div className={"bg-darkBlue  overflow-hidden"}>
            <div className="gradient flex flex-col gap-8 relative w-full pt-3 px-16 max-md:px-5 pb-7  Artistbackground">
                <div className="grid grid-cols-[max-content,auto] mt-7 max-md:grid-cols-1 max-md:place-items-center gap-5 ">
                    <img className="w-56 h-56 rounded-full" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />

                    <div className="flex place-content-end max-md:place-items-center flex-col">
                        <h2
                            className="font-bold text-6xl max-md:text-center max-md:text-2xl text-white tracking-wider"
                            dangerouslySetInnerHTML={{
                                __html: `Hello ${user.username}`,
                            }}
                        />

                        <div className="flex max-md:flex-col items-center gap-3 max-md:my-0 max-md:gap-2 my-2 max-md:mt-4">
                            <p
                                className="text-slate-200 text-sm max-md:text-xs max-md:text-center"
                                dangerouslySetInnerHTML={{
                                    __html: `joined on 2024-04-01`
                                }}
                            />
                            <div className="bg-darkTextColor rounded-full w-1 h-1 max-md:hidden"></div>
                            <p className="text-slate-200 text-sm max-md:text-xs">
                                10 playlists
                            </p>
                            <div className="bg-darkTextColor rounded-full max-md:text-xs w-1 h-1 max-md:hidden"></div>
                            <p className="text-slate-200 text-sm min-w-fit">
                                ridmi@gmail.com
                            </p>
                            <p className="text-slate-200 text-sm min-w-fit cursor-pointer">
                                <EditIcon />
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <hr className="bg-darkTextColor h-[0.8px] opacity-10 my-6 px-7" />
            <section className="flex ml-10 w-full my-6 mt-10">
                <div className='flex justify-between items-center'>
                    <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                        My Top Playlists
                    </h1>
                    <h2 className=' font-light text-sm w-fit text-lightTextColor mr-8'>show all</h2>
                </div>
                <div className="flex gap-6 overflow-scroll h-full">
                    {/* {trendingAlbums.map((item) => (
                        <MusicCard album={item} key={item.id} />
                    ))} */}
                </div>
            </section >
            <section className="flex justify-between ml-10 my-6 mt-10 items-center">
                <h1 className="font-medium text-xl w-fit text-lightTextColor my-4">
                    Suggest for you
                </h1>
                <h2 className=' font-light text-sm w-fit text-lightTextColor mr-8'>show all</h2>
            </section >
        </div>
    )
}

export default MyProfile

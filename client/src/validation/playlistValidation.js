import * as yup from 'yup'

export const playlistSchema = yup.object().shape({
    name:yup.string().required("Enter playlist name").matches(/^\S.*$/, "Playlist name cannot start with whitespace")
})
import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    songID:{
        type: String
    },
    isFavourite:{
        type: Boolean
    }
})

const playlistSchema = mongoose.Schema({
    name:{
        type:String
    },
    songs:[songSchema]
})


const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        image:{
            type: String
        },
        playlist:[playlistSchema]
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('users', userSchema)
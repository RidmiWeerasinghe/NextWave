import mongoose from "mongoose";

const songSchema = mongoose.Schema({
    songID:{
        type: String
    }
})

const playlistSchema = mongoose.Schema({
    name:{
        type:String
    },
    songs:[songSchema]
})

const favoritesSchema = mongoose.Schema({
    songID:{
        type:String
    }
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
        imageUrl:{
            type: Object
        },
        playlist:[playlistSchema],
        favorites:[favoritesSchema]
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('users', userSchema)
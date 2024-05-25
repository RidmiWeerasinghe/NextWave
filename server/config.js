import dotenv from 'dotenv'
dotenv.config()

export const PORT = 5555
export const mongodbUrl = "mongodb://localhost:27017/nextwavedb"
export const EMAIL = process.env.EMAIL
export const PASSWORD = process.env.PASSWORD
export const SPOTIFY_CLIENT_Id = process.env.SPOTIFY_CLIENT_Id
export const SPOTIFY_CLIENT_SCECRET = process.env.SPOTIFY_CLIENT_SCECRET
import mongoose from "mongoose"

const historySchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        tracks: [
            {
                trackID: {
                    type: String
                },
                name: {
                    type: String
                },
                artist: {
                    type: String
                },
                count: {
                    type: Number
                }
            }
        ]
    }
)

export const History = mongoose.model('history', historySchema)
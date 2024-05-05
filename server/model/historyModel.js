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
                }
            }
        ]
    }
)

export const History = mongoose.model('history',historySchema)
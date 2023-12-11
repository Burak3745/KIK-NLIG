import mongoose from 'mongoose'

const seriesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    time: {
        type: String,
    },
    link: {
        type: String,
    },
    year: {
        type: String,
    },
    description: {
        type: String,
    },
    season: {
        type: String,
    },
    episode: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
     },
    foreignkey: {
        type: String,
        require: true,
    }
})

export default mongoose.model('Series', seriesSchema)
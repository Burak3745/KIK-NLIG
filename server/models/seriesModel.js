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
    links: [
        {
            hostingname: {
                type: String,
            },
            adress:{
                type: String,
            }
        }
    ],
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
    },
    watched: [
        {
            userid: {
                type: String,
              }
        }
    ],
    comment: [
        {
            userid: {
                type: String,
            },
            description: {
                type: String,
            },
            date: {
                type: String,
            }
        }
    ],
    likes: [
        {
            userid: {
                type: String,
            }
        }
    ],

    dislikes: [
        {
            userid: {
                type: String,
            }
        }
    ],
})

export default mongoose.model('Series', seriesSchema)
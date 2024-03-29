import mongoose from 'mongoose'
const Schema = mongoose.Schema

const movieSchema = Schema({
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

    player: [
        {
            name: {
                type: String,
            },
            image: {
                type: String,
            },
            actorsid: {
                type: String,
            }
        }
    ],
    name: {
        type: String,
        required: true
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
            adress: {
                type: String,
            },
            options: {
                type: String,
                enum: ['Dublaj', 'Altyazı'],
                default: 'Altyazı'
            }
        }
    ],

    country: {
        type: String,
        required: true
    },
    year: {
        type: String,
    },
    score: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    director: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    season: {
        type: String,
    },
    type: {
        type: String,
        enum: ['Film', 'Dizi'],
    },

    views: {
        type: Number,
        default: 0,
    },
    catagory: {
        type: String,
    },
    image: {
        type: String,
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
})

export default mongoose.model('Movie', movieSchema)
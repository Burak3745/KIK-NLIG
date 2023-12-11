import mongoose from 'mongoose'
const Schema = mongoose.Schema

const movieSchema = Schema({
    user: {
        type: String,
        
    },
    likes: [
        {
            user: {
              type: String,
            }
        }
    ],
    
    dislikes: [
        {
            user: {
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
    actors: {
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
        enum: ['Action & Advanture', 'Animation','Comedy', 'Crime','Documentary', 
        'Drama','Family', 'Kids','Mystery', 'News','Reality',
        'Sci-Fi & Fantasy','Soap', 'Talk','War & Politics', 'Western'],
    },
    image: {
        type: String,
    },
})

export default mongoose.model('Movie', movieSchema)
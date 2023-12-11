import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    movieId: {
        type: String,
    },
})

export default mongoose.model('Post', postSchema)
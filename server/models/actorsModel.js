import mongoose from 'mongoose'

const actorsSchema = mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
})

export default mongoose.model('Actors', actorsSchema)
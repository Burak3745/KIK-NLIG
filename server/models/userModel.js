import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    phoneNumber: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
        default: "data:image/png;base64,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"
    },
    hostingname: {
        type: String,
        default: ""
    },
})

export default mongoose.model('User', userSchema)
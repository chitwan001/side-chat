import { Schema, model } from 'mongoose'
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    seed: {
        type: String,
        required: true
    },
    stripe: {
        type: String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    activeChats: {
        type: [Schema.Types.ObjectId],
        ref: 'Chat',
        default: [],
        autopopulate: true,
        required: false
    }
})
userSchema.plugin(require('mongoose-autopopulate'));
const User = model('User', userSchema)

export default User
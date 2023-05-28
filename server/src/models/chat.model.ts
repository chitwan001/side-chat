import { Schema, model } from 'mongoose'
const ChatSchema = new Schema({
    users: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        autopopulate: true,
        required: true
    },
    chats: {
        type: [
            {
                to: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    autopopulate: true
                },
                from: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    autopopulate: true
                },
                body: { type: String },
                type: { type: String },
                status: {
                    type: String
                },
                sentTime: {
                    type: Schema.Types.Date
                }
            }
        ]
    }
}, { timestamps: true })
ChatSchema.plugin(require('mongoose-autopopulate'));
const Chat = model('Chat', ChatSchema)

export default Chat
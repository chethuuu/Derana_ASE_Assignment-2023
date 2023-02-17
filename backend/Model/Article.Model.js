const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = mongoose.Schema({
    location: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    postImg: {
        type: String,
        required: true,
    },

    postedBy: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', articleSchema)
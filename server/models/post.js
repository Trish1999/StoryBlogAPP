const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    likeCount: {
        type: String,
        required: false,
    },
    isBookmarked: {
        type: Boolean,
        required: false,
    },
    isSaved: {
        type: Boolean,
        required: false,
    },
    isLiked: {
        type: Boolean,
        required: false,
    },
    refUserId: {
        type: mongoose.ObjectId,
    },

},
    {
        timestamps: {
            createdAt: "createdAt", updatedAt: "updatedAt"
        }
    }
);
module.exports=mongoose.model("Post",postSchema)
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postedIn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subgreddit"
    },
    upvotes: {
        type: Array,
        default: []
    },
    downvotes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
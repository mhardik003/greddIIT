import mongoose from "mongoose";

const SubgredditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    bannedKeywords: {
        type: Array,
        default: []
    },
    moderators: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    followers: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    blockedFollowers: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    joinRequests: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    visitors: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "User"
    },
    posts: {
        type: Array,
        default: [],
        ref: "Post"
    },
    reportedPosts: {
        type: Array,
        default: [mongoose.Schema.Types.ObjectId],
        ref: "Post"
    },   
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Subgreddit = mongoose.model("Subgreddit", SubgredditSchema);
export default Subgreddit;

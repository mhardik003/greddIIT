import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reportedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    concern: {
        type: String,
        required: true
    },
    reportedPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    reportedSubgreddit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subgreddit"
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;

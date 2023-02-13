import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    contactNumber:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        min: 6
    }, 
    picturePath:{
        type: String,
        default:"",
    },
    following:{
        type: Array,
        default:[],
    },
    followers:{
        type: Array,
        default:[],
    },
    posts:{
        type: Array,
        default:[]
    },
    creationDate:{
        type: Date,
        default: Date.now
    },
    savedPosts:{
        type: Array,
        default:[]
    },
    upvotedPosts:{
        type: Array,
        default:[],
        ref: "Post"
    },
}, 
{timeStamps: true}
);

const User = mongoose.model('User', UserSchema);
export default User;
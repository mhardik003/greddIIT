import Post from '../models/post';
import User from '../models/user';


export const createPost = async (req, res) => {
    try {
        const { title, description, userId, subgreddit } = req.body;
        const user = await User.findbyId(userId);
        const newPost = new Post({
            title,
            description,
            postedBy: user,
            postedIn: subgreddit,
            upvotes: [],
            downvotes: [],
            comments: [],
            creationDate: Date.now()

        });

        const savedPost = await newPost.save();
        const allPosts = await Post.find();
        res.status(201).json(allPosts);

    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const getPosts = async (req, res) => {
    try{
        const posts = await Post.find();
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}


export const getSubgredditPosts = async (req, res) => {
    try{
        const posts = await Post.find({postedIn: req.params.id});
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}



export const upvotePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (post.upvotes.includes(req.body.userId)) {
            await post.updateOne({ $pull: { upvotes: req.body.userId } });
            await post.save();
            res.status(200).json("The post has been un-upvoted");
        } else {
            await post.updateOne({ $push: { upvotes: req.body.userId } });
            await post.save();
            res.status(200).json("The post has been upvoted");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}


export const downvotePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (post.downvotes.includes(req.body.userId)) {
            await post.updateOne({ $pull: { downvotes: req.body.userId } });
            await post.save();
            res.status(200).json("The post has been un-downvoted");
        } else {
            await post.updateOne({ $push: { downvotes: req.body.userId } });
            await post.save();
            res.status(200).json("The post has been downvoted");
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const getUserPosts = async (req, res) => {
    try{
        const posts = await Post.find({postedBy: req.params.userId});
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }
}


export const savePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.PostId);
        const user = await User.findById(req.body.userId);
    }
    catch (error) {
        res.status(500).json({ message: error.message});
    }

}




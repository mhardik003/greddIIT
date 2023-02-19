import Post from "../models/Post.js";
import User from "../models/User.js";
import Subgreddit from "../models/Subgreddit.js";

export const createPost = async (req, res) => {
  try {
    console.log("req.body : ", req.body);
    const title = req.body.values.title;
    const description = req.body.values.description;
    const subgredditId = req.body.subgrediitId;
    const userId = req.body.userId;
    const subgreddit = await Subgreddit.find({ _id: subgredditId });
    console.log("> subgreddit : ", subgreddit[0].name);
    const user = await User.find({ _id: userId });
    console.log("> user : ", user[0].firstName);

    const newPost = new Post({
      title: title,
      description:description,
      postedBy: user[0],
      postedIn: subgreddit[0],
      upvotes: [],
      downvotes: [],
      comments: [],
    });

    const savedPost = await newPost.save();
    console.log("savedPost : ", savedPost);

    // save the post in the subgrediit too
    subgreddit[0].posts.push(savedPost);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");

    // save the post in the user too
    user[0].posts.push(savedPost);
    await user[0].save();
    console.log("User has been updated");


    const allPosts = await Post.find();
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSubgredditPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedIn: req.params.id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const upvotePost = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downvotePost = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ postedBy: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.PostId);
    const user = await User.findById(req.body.userId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Post from "../models/Post.js";
import User from "../models/User.js";
import Subgreddit from "../models/Subgreddit.js";

export const getSubgrediitPosts = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.find({ _id: req.params.subgrediitId });
    const post_ids = subgreddit[0].posts;

    // find the posts with the ids in post_ids
    const all_posts = await Post.find({ _id: { $in: post_ids } });
    // console.log("> all_posts : ", all_posts);
    res.status(200).json(all_posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    // console.log("req.body : ", req.body);
    const title = req.body.values.title;
    const description = req.body.values.description;
    const subgredditId = req.body.subgrediitId;
    const userId = req.body.userId;
    const subgreddit = await Subgreddit.find({ _id: subgredditId });
    // console.log("> subgreddit : ", subgreddit[0].name);
    const user = await User.find({ _id: userId });
    // console.log("> user : ", user[0].firstName);

    const newPost = new Post({
      title: title,
      description: description,
      postedBy: user[0],
      postedIn: subgreddit[0],
      upvotes: [],
      downvotes: [],
      comments: [],
    });

    const savedPost = await newPost.save();
    // console.log("savedPost : ", savedPost);

    // save the post in the subgrediit too
    subgreddit[0].posts.push(savedPost._id);
    await subgreddit[0].save();
    // console.log("Subgreddit has been updated");

    // save the post in the user too
    user[0].posts.push(savedPost._id);
    await user[0].save();
    // console.log("User has been updated");

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

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId);
    // console.log("post : ", post);
    const subgredditId = post.postedIn;
    const subgreddit = await Subgreddit.findById(subgredditId);
    // console.log("subgreddit : ", subgreddit);
    const userId = post.postedBy;
    const user = await User.findById(userId);
    // console.log("user : ", user);

    // check if the post is part of the saved posts, upvoted posts, downvotes posts of all users and remove it
    const allUsers = await User.find();
    allUsers.forEach(async (user) => {
      if (user.savedPosts.includes(postId)) {
        let index = user.savedPosts.indexOf(postId);
        user.savedPosts.splice(index, 1);
        await user.save();
      }
      if (user.upvotedPosts.includes(postId)) {
        let index = user.upvotedPosts.indexOf(postId);
        user.upvotedPosts.splice(index, 1);
        await user.save();
      }
      if (user.downvotedPosts.includes(postId)) {
        let index = user.downvotedPosts.indexOf(postId);
        user.downvotedPosts.splice(index, 1);
        await user.save();
      }
    });

    // remove the post from the subgreddit
    let index = subgreddit.posts.indexOf(postId);
    subgreddit.posts.splice(index, 1);
    await subgreddit.save();

    // remove the post from the user
    index = user.posts.indexOf(postId);
    user.posts.splice(index, 1);
    await user.save();

    // remove the post
    await post.remove();
    res.status(200).json("The post has been deleted");
  } catch (error) {
    res.status(500).json({ message: error.message, error: error });
  }
};

export const upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log("post : ", post);

    // check if the user has already upvoted the post
    if (post.upvotes.includes(userId)) {
      // if yes, remove the upvote
      let index = post.upvotes.indexOf(userId);
      post.upvotes.splice(index, 1);
      await post.save();

      // remove the post from the user's upvoted posts
      index = user.upvotedPosts.indexOf(req.params.postId);
      user.upvotedPosts.splice(index, 1);
      await user.save();

      res.status(200).json("The post has been un-upvoted");
    } else {
      // if no, add the upvote
      post.upvotes.push(userId);
      await post.save();

      // add the post to the user's upvoted posts
      user.upvotedPosts.push(req.params.postId);
      await user.save();

      res.status(200).json("The post has been upvoted");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const userId = req.params.id;
    const user = await User.findById(userId);

    console.log("post : ", post);

    // check if the user has already downvoted the post
    if (post.downvotes.includes(userId)) {
      // if yes, remove the downvote
      let index = post.downvotes.indexOf(userId);
      post.downvotes.splice(index, 1);
      await post.save();

      index = user.downvotedPosts.indexOf(req.params.postId);
      user.downvotedPosts.splice(index, 1);
      await user.save();

      res.status(200).json("The post has been un-downvoted");
    } else {
      // if no, add the downvote
      post.downvotes.push(userId);
      await post.save();

      user.downvotedPosts.push(req.params.postId);
      await user.save();
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
    // console.log("req.params : ", req.params);
    const users = await User.find({ _id: req.params.id });
    const user = users[0];
    const post = await Post.findById(req.params.postId);
    // console.log("user : ", user);
    // check if the user has already saved the post
    if (user.savedPosts.includes(req.params.postId)) {
    

      let index = user.savedPosts.indexOf(req.params.postId);
      user.savedPosts.splice(index, 1);
      await user.save();

      index= post.savedBy.indexOf(req.params.id);
      post.savedBy.splice(index, 1);
      await post.save();
      console.log("> The post has been unsaved")
      res.status(200).json("The post has been unsaved");
    } else {
      

      user.savedPosts.push(req.params.postId);
      await user.save();

      post.savedBy.push(req.params.id);
      await post.save();
      console.log("> The post has been saved")
      res.status(200).json("The post has been saved");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import Subgreddit from "../models/Subgreddit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

export const getSubgrediit = async (req, res) => {
  try {
    console.log("> req.params.id : ", req.params.id);
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    res.status(200).json(subgreddit[0]);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getMySubgrediits = async (req, res) => {
  try {
    console.log("req.params.id : ", req.params.id);
    let mySubgrediits = [];
    const allSubgrediits = await Subgreddit.find();
    allSubgrediits.forEach((subgreddit) => {
      if (subgreddit.moderators[0] === req.params.id) {
        mySubgrediits.push(subgreddit);
        console.log("> subgreddit : ", subgreddit.name);
      }
    });
    res.status(200).json(mySubgrediits);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllSubgrediits = async (req, res) => {
  try {
    console.log("getAllSubgrediits");
    const subgreddits = await Subgreddit.find();
    // console.log("subgreddits : ", subgreddits);
    // only send the _id of the subgreddits
    console.log("subgreddits sent : ", subgreddits.length);

    res.status(200).json(subgreddits);
  } catch (error) {
    console.log("BANDARR");
    res.status(404).json({ error: error.message, message: "BANDAR" });
  }
};

export const createSubgrediit = async (req, res) => {
  try {
    // console.log("req.body : ", req.body);
    const { name, description, tags, bannedKeywords, subgrediitPicture } =
      req.body.values;
    const { moderator, followers } = req.body;
    let tagsArray = [];
    if (tags) {
      tagsArray = tags.split(",");
    }
    let bannedKeywordsArray = [];
    if (bannedKeywords) {
      bannedKeywordsArray = bannedKeywords.split(",");
    }
    // console.log("> name from the request : ", name);
    // console.log("> description from the request : ", description);
    // console.log("> picturePath from the request : ", subgrediitPicture);
    // console.log("> tags from the request : ", tagsArray);
    // console.log("> banndedKeywords from the request : ", bannedKeywordsArray);
    // console.log("> moderator from the request : ", moderator);
    // console.log("> followers from the request : ", followers);

    const newSubgreddit = new Subgreddit({
      name,
      description,
      subgrediitPicture,
      tags: tagsArray,
      bannedKeywords: bannedKeywordsArray,
      moderators: [moderator],
      followers,
    });
    await newSubgreddit.save();
    res.status(201).json(newSubgreddit);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const editSubgrediit = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE SUBGREDDIT DETAILS
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const { name, description, picturePath } = req.body;

    // console.log("name from the request : ", name);
    subgreddit[0].name = name;
    subgreddit[0].description = description;
    subgreddit[0].picturePath = picturePath;
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const deletePost = async (postId) => {
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
    console.log("Post has been deleted");
  } catch (error) {
    console.log(">>> error : ", error);
  }
};

export const deleteSubgrediit = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    await subgreddit.remove();

    // remove all the posts in the subgreddit also
    const posts = await Post.find({ postedIn: req.params.id });
    posts.forEach(async (post) => {
      await deletePost(post._id);
    });

    res.status(200).json("Subgreddit has been deleted");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSubgrediitFollowers = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    // console.log("subgreddit from getSubgredditFollowers : ", subgreddit);
    const followers = await Subgreddit.find({
      _id: { $in: subgreddit.followers },
    });
    let followersList = [];
    followers.map((follower) => {
      const { _id, firstName, lastName, userName } = follower;
      followersList.push({ _id, firstName, lastName, userName });
    });
    res.status(200).json(followersList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSubgrediitBlocked = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    // console.log("subgreddit from getSubgredditBlocked : ", subgreddit);
    const blocked = await Subgreddit.find({
      _id: { $in: subgreddit.blocked },
    });
    let blockedList = [];
    blocked.map((block) => {
      const { _id, firstName, lastName, userName } = block;
      blockedList.push({ _id, firstName, lastName, userName });
    });
    res.status(200).json(blockedList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSubgrediitJoinRequests = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    // console.log("subgreddit from getSubgredditJoinRequests : ", subgreddit);
    const joinRequests = await Subgreddit.find({
      _id: { $in: subgreddit.joinRequests },
    });
    let joinRequestsList = [];
    joinRequests.map((joinRequest) => {
      const { _id, firstName, lastName, userName } = joinRequest;
      joinRequestsList.push({ _id, firstName, lastName, userName });
    });
    res.status(200).json(joinRequestsList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getSubgrediitPosts = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    // console.log("subgreddit from getSubgredditPosts : ", subgreddit);
    const posts = await Subgreddit.find({ _id: { $in: subgreddit.posts } });
    let postsList = [];
    posts.map((post) => {
      const { _id, title, description, picturePath } = post;
      postsList.push({ _id, title, description, picturePath });
    });
    res.status(200).json(postsList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const joinSubgrediit = async (req, res) => {
  try {
    console.log(">>> req.params.id : ", req.params.id);
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const userId = req.params.userId;
    console.log("userId : ", userId);

    if (subgreddit[0].joinRequests.includes(userId)) {
      res
        .status(200)
        .json("You have already requested to join this subgreddit");
      subgreddit[0].joinRequests.pull(userId);
      await subgreddit[0].save();
      return;
    }
    subgreddit[0].joinRequests.push(userId);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const leaveSubgrediit = async (req, res) => {
  try {

    console.log(">>  A user is trying to leave the subgrediit")
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const userId = req.params.userId;
    // console.log("user from the request : ", user);
    if (subgreddit[0].followers.includes(userId)) {
      subgreddit[0].followers.pull(userId);
    }
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    console.log(">>  A user has left the subgrediit ")
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const addPostToSubgreddit = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE SUBGREDDIT DETAILS
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const { post } = req.body;
    // console.log("post from the request : ", post);
    subgreddit[0].posts.push(post);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const removePostFromSubgreddit = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE SUBGREDDIT DETAILS
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const { post } = req.body;
    console.log("post from the request : ", post);
    subgreddit[0].posts.pull(post);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const acceptJoinRequest = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    const userId = req.params.userId;
    subgreddit[0].followers.push(userId);
    subgreddit[0].joinRequests.pull(userId);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const rejectJoinRequest = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    const userId = req.params.userId;
    subgreddit[0].joinRequests.pull(userId);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const blockUser = async (req, res) => {
  try {
    // console.log(" > > > req.params.id : ", req.params);
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    const userId = req.params.userId;

    // console.log(" > > > subgreddit : ", subgreddit);
    // console.log(" > > > userId : ", userId);
    if (subgreddit[0].followers.includes(userId)) {
      subgreddit[0].followers.pull(userId);
    }
    if (subgreddit[0].joinRequests.includes(userId)) {
      subgreddit[0].joinRequests.pull(userId);
    }
    console.log(
      " > > > subgreddit[0].blockedFollowers : ",
      subgreddit[0].blockedFollowers
    );
    if (subgreddit[0].blockedFollowers.includes(userId)) {
      res.status(200).json("User is already blocked");
      return;
    }

    subgreddit[0].blockedFollowers.push(userId);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

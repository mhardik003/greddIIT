import Subgreddit from "../models/Subgreddit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import fetch from "node-fetch";

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

    const user = await User.find({ _id: moderator });
    // console.log("user : ", user);

    let tagsArray = [];
    if (tags) {
      tagsArray = tags.split(",");
    }
    let bannedKeywordsArray = [];
    if (bannedKeywords) {
      bannedKeywordsArray = bannedKeywords.split(",");
    }

    const newSubgreddit = new Subgreddit({
      name,
      description,
      subgrediitPicture,
      tags: tagsArray,
      bannedKeywords: bannedKeywordsArray,
      moderators: [moderator],
      followers: [moderator],
      creationDate: new Date(),
    });

    const newSub = await newSubgreddit.save();
    console.log("newSub id : ", newSub._id);

    // add newSub to the user's subgrediits
    user[0].mySubgrediits.push(newSub._id);
    await user[0].save();

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

export const deleteSubgrediit = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    await subgreddit.remove();

    // remove the subgreddit from all the users' mysubgrediits
    const allUsers = await User.find();
    allUsers.forEach(async (user) => {
      if (user.mySubgrediits.includes(req.params.id)) {
        let index = user.mySubgrediits.indexOf(req.params.id);
        user.mySubgrediits.splice(index, 1);

        await user.save();
      }
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
    console.log(">>  A user is trying to leave the subgrediit");
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const userId = req.params.userId;
    // console.log("user from the request : ", user);
    if (subgreddit[0].followers.includes(userId)) {
      subgreddit[0].followers.pull(userId);
    }
    if (!subgreddit[0].leftors.includes(userId)) {
      subgreddit[0].leftors.push(userId);
    }

    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    console.log(">>  A user has left the subgrediit ");
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

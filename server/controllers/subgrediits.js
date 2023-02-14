import Subgreddit from "../models/Subgreddit.js";
// import User from "../models/User";

export const getSubgrediit = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);

    const subgreddit = await Subgreddit.findById(req.params.id);
    // console.log("subgreddit : ", subgreddit);
    res.status(200).json(subgreddit);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getMySubgrediits = async (req, res) => {
    try {
        console.log("req.params.id : ", req.params.id);
        let subgreddits = [];
        const subgrediits= await Subgreddit.find();
        subgrediits.forEach((subgreddit)=>{
                // console.log("subgreddit.moderators : ", subgreddit.moderators);
            if(subgreddit.moderators[0]._id===req.params.id){
                subgreddits.push(subgreddit);
                console.log("> subgreddit : ", subgreddit.name);
            }
        })



        // const subgreddits = await Subgreddit.find({moderators: req.params.id});
        // console.log("subgreddit : ", subgreddit);
        res.status(200).json(subgreddits);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

export const getAllSubgrediits = async (req, res) => {
  try {
    const subgreddits = await Subgreddit.find();
    // console.log("subgreddits : ", subgreddits);
    // only send the _id of the subgreddits
    res.status(200).json(subgreddits);
  } catch (error) {
    res.status(404).json({ error: error.message });
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
    console.log("> name from the request : ", name);
    console.log("> description from the request : ", description);
    console.log("> picturePath from the request : ", subgrediitPicture);
    console.log("> tags from the request : ", tagsArray);
    console.log("> banndedKeywords from the request : ", bannedKeywordsArray);
    console.log("> moderator from the request : ", moderator);
    console.log("> followers from the request : ", followers);

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

export const deleteSubgrediit = async (req, res) => {
  try {
    const subgreddit = await Subgreddit.findById(req.params.id);
    await subgreddit.remove();
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
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE SUBGREDDIT DETAILS
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const { user } = req.body;
    // console.log("user from the request : ", user);
    subgreddit[0].followers.push(user);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
    res.status(200).json("Subgreddit has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const leaveSubgrediit = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE SUBGREDDIT DETAILS
    const subgreddit = await Subgreddit.find({ _id: req.params.id });
    // console.log("FOUND THE SUBGREDDIT : ", subgreddit);
    const { user } = req.body;
    // console.log("user from the request : ", user);
    subgreddit[0].followers.pull(user);
    await subgreddit[0].save();
    console.log("Subgreddit has been updated");
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

import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    console.log("req.params.id : ", req.params.id);

    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);
    // console.log("req.body : ", req.body);
    // EDIT THE USER DETAILS
    const user = await User.find({ _id: req.params.id });
    // console.log("FOUND THE USER : ", user);
    const { firstName, lastName, userName, email, age, contactNumber } =
      req.body;

      // console.log("firstName from the request : ", firstName);
    user[0].firstName = firstName;
    user[0].lastName = lastName;
    user[0].userName = userName;
    user[0].email = email;
    user[0].age = age;
    user[0].contactNumber = contactNumber;
    await user[0].save();
    console.log("User has been updated");
    res.status(200).json("User has been updated");
  } catch (error) {
    res.status(404).json({ error: error.message, "message": "BANDARRRRRRRR"});
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.find(req.params.id);
    const followers = await Promise.all(
      user.followers.map((followerId) => {
        User.findById(followerId);
      })
    );
    let followersList = [];
    followers.map((follower) => {
      const { _id, firstName, lastName, userName, picturePath } = follower;
      followersList.push({ _id, firstName, lastName, userName, picturePath });
    });
    res.status(200).json(followersList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const following = await Promise.all(
      user.following.map((followingId) => {
        User.findById(followingId);
      })
    );
    let followingList = [];
    following.map((following) => {
      const { _id, firstName, lastName, userName, picturePath } = following;
      followingList.push({ _id, firstName, lastName, userName, picturePath });
    });
    res.status(200).json(followingList);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const AddremoveFollower = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const follower = await User.findById(req.params.followerId);
    if (user.followers.includes(follower._id)) {
      await user.updateOne({ $pull: { followers: follower._id } });
      await follower.updateOne({ $pull: { following: user._id } });
      res.status(200).json("User has been unfollowed");
    } else {
      await user.updateOne({ $push: { followers: follower._id } });
      await follower.updateOne({ $push: { following: user._id } });
      res.status(200).json("User has been followed");
    }
    await user.save();
    await follower.save();

    let followersList = [];

    const followers = await Promise.all(
      user.followers.map((followerId) => {
        const { _id, firstName, lastName, userName, picturePath } = followerId;
        followersList.push({ _id, firstName, lastName, userName, picturePath });
      })
    );

    res.status(200).json(followersList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AddremoveFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const following = await User.findById(req.params.followingId);
    if (user.following.includes(following._id)) {
      await user.updateOne({ $pull: { following: following._id } });
      await following.updateOne({ $pull: { followers: user._id } });
      res.status(200).json("User has been unfollowed");
    } else {
      await user.updateOne({ $push: { following: following._id } });
      await following.updateOne({ $push: { followers: user._id } });
      res.status(200).json("User has been followed");
    }
    await user.save();
    await following.save();

    let followingList = [];
    const following_1 = await Promise.all(
      user.following.map((followingId) => {
        const { _id, firstName, lastName, userName, picturePath } = followingId;
        followingList.push({ _id, firstName, lastName, userName, picturePath });
      })
    );

    res.status(200).json(followingList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

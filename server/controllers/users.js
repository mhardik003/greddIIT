import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    // console.log("req.params.id : ", req.params.id);

    const user = await User.findById(req.params.id);
    // console.log("user : ", user);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    // console.log("users : ", users);
    // only send the _id of the users
    res.status(200).json(users);
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
    res.status(404).json({ error: error.message });
  }
};

export const getUserFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    // console.log("user from getUserFollowers : ", user);
    const followers = await User.find({ _id: { $in: user.followers } });
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
    const following = await User.find({ _id: { $in: user.following } });
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
    const user = await User.find({ _id: req.params.id });
    const follower = await User.find({ _id: req.params.followerId });
    // console.log("userid : ", user[0].followers);
    // console.log("followerid : ", follower[0]._id);

    if (user[0].followers.includes(follower[0]._id)) {
      const index = user[0].followers.indexOf(follower[0]._id);
      user[0].followers.splice(index, 1);

      const index2 = follower[0].following.indexOf(user[0]._id);
      follower[0].following.splice(index2, 1);

      await user[0].save();
      await follower[0].save();
      console.log("User has been unfollowed");
      res.status(200).json("User has been unfollowed");
    } else {
      user[0].followers.push(follower[0]._id);
      follower[0].following.push(user[0]._id);
      await user[0].save();
      await follower[0].save();
      console.log("User has been followed");
      res.status(200).json("User has been followed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const AddremoveFollowing = async (req, res) => {
  try {
    console.log(
      "> TRYING TO REMOVE FOLLOWING : ",
      req.params.id,
      req.params.followingId
    );

    const user = await User.find({ _id: req.params.id });
    const following = await User.find({ _id: req.params.followingId });

    console.log("> user : ", user);
    console.log("> following : ", following);

    if (user[0].following.includes(following[0]._id)) {
      console.log("> User is already following");
      let index = user[0].following.indexOf(following[0]._id);
      user[0].following.splice(index, 1);

      index = following[0].followers.indexOf(user[0]._id);
      following[0].followers.splice(index, 1);

      await user[0].save();
      await following[0].save();
      console.log("> User has been unfollowed");
      res.status(200).json("User has been unfollowed");
    } else {
      console.log("> User is not following");
      user[0].following.push(following[0]._id);
      following[0].followers.push(user[0]._id);

      await user[0].save();
      await following[0].save();
      console.log("User has been followed");
      res.status(200).json("User has been followed");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

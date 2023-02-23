import Post from "../models/Post.js";
import User from "../models/User.js";
import Subgreddit from "../models/Subgreddit.js";
import Report from "../models/Report.js";
import mongoose from "mongoose";

export const createReport = async (req, res) => {
  console.log(">> req.body : ", req.body);
  const {
    concern,
    reportedBy,
    reportedPost,
    reportedSubgrediit,
    reportedUser,
  } = req.body;
  const newReport = new Report({
    concern: concern,
    reportedBy: reportedBy,
    reportedPost: reportedPost,
    reportedSubgrediit: reportedSubgrediit,
    reportedUser: reportedUser,
  });
  try {
    const savedReport = await newReport.save();
    res.status(200).json(savedReport);
  } catch (err) {
    res.status(500).json(err);
  }
};

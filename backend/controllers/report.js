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

// find those reports with the subgrediit id
export const getSubgrediitReports = async (req, res) => {
  try {
    const subgrediitReports = await Report.find({
      reportedSubgrediit: req.params.subgrediitId,
    });
    res.status(200).json(subgrediitReports);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const ignoreReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    report.ignored = true;
    const ignoredReport = await report.save();
    res.status(200).json(ignoredReport);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteReport = async (req, res) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json("Report has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

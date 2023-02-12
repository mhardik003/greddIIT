import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* Register User */
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      age,
      contactNumber,
      password,
      profilePicture,
    } = req.body;
    // console.log(req.body);
    const salt = await bcrypt.genSalt(); //generate salt for hashing password
    const passwordHash = await bcrypt.hash(password, salt); //hash password

    //check if the email already exists in the database
    try {
      let check = await User.exists({ email: email });
      if (check) {
        console.log("Email already exists");
        return res.status(409).json({ message: "Email already exists" });
      }
      
    } catch (error) {
      console.log(error);
    }

    const newUser = new User({
      firstName,
      lastName,
      userName,
      email,
      age,
      contactNumber,
      password: passwordHash,
      picturePath: profilePicture,
    });

    const savedUser = await newUser.save(); //save user to database
    // console.log(savedUser)
    res.status(201).json(savedUser); //send saved user to client
  } catch (error) {
    res.status(500).json({ error: error.message });

    // console.log("hiii");
    console.log(error);
  }
};

/* Login User */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let check = await User.exists({ email: email });
    if (!check) {
      console.log("Email does not exist");
      return res.status(409).json({ message: "Email does not exist" });
    }


    const user = await User.findOne({ email: email }); //find user in database

    if (!user) return res.status(404).json({ message: "User not found" }); //if user not found, send error message

    const isMatch = await bcrypt.compare(password, user.password); //compare password with hashed password
    if (!isMatch){
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" }); //if password is incorrect, send error message
    
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); //create token
    delete user.password; //delete password from user object

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        age: user.age,
        contactNumber: user.contactNumber,
        picturePath: user.picturePath,
      },
    }); //send token and user to client
  } catch (error) {
    res.status(500).json({ error: error.message });
    // console.log("hiiii");
    console.log(error);
  }
};

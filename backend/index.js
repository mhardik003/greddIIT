import express from "express";
import bodyParser from "body-parser"; // to process the body of the request
import cors from "cors"; // to use cross origin resource sharing policies
import mongoose from "mongoose"; // for mongodb access
import dotenv from "dotenv"; // for environment variables
import multer from "multer"; // to upload the files locally
import path from "path";
import { fileURLToPath } from "url";
// import { dirname } from "path";
import helmet from "helmet";
import morgan from "morgan";
// import socketIO from "socket.io";
// import {verifyToken} from "./middleware/auth.js";
// import { editUser } from "./controllers/users.js";

import authRoutes from "./routes/auth.js";
import { registerUser } from "./controllers/auth.js";
import userRoutes from "./routes/users.js";
import subgredditRoutes from "./routes/subgrediits.js";
import postRoutes from "./routes/post.js";
import reportRoutes from "./routes/report.js";

// CONFIGURATIONS (middleware configurations as well as package configurations)
const __filename = fileURLToPath(import.meta.url); // to grab the file url (for modules)
const __dirname = path.dirname(__filename);
dotenv.config(); // to use .env file

const app = express(); // to use express
const io = app.use(express.json()); // to use json
app.use(helmet()); // to use helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // to use helmet
app.use(morgan("common")); // to use morgan
app.use(cors()); // to invoke the cross origin resource sharing policies
app.use(bodyParser.json({ limit: "30mb", extended: true })); // to use body parser
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // to use body parser
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); // storing the files locally in the server (for images)

// FILE STORAGE
// saving the file in the server locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// ROUTE with files
app.post("/api/auth/register", upload.single("picture"), registerUser);
// app.put("/users/edit/:id", editUser)

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/subgrediits", subgredditRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/reports", reportRoutes);

// MONGOOSE CONNECTION
const PORT = process.env.PORT || 6001; // to use the port from .env file (if not, use 6001 as backup)
mongoose.set("strictQuery", true); // to use strict query

// console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(error.message));

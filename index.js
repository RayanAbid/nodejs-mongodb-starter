const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
app.use(cors());

mongoose.connect(
  process.env.MONGO_DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
    //middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    // routes
    // Users route
    const userRoute = require("./routes/Users");
    app.use("/auth", userRoute);

    app.listen(3001, () => {
      console.log("HTTP Server running on port 3001");
    });
  }
);

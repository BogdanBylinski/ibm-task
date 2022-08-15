const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Log } = require("./userMove");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/log", async (req, res) => {
    console.log(req.body)
    const newLog = new Log({ ...req.body });
    const insertedLog = await newLog.save();
    return res.status(201).json(insertedLog);
  });

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@usershistory.tfzqezt.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(3003, () => console.log("Server started on port 3003"));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Log } = require("./userMove");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/log", async (req, res) => {
  try {
    const newLog = new Log({ ...req.body });
    const insertedLog = await newLog.save();
    console.log(req.body);
    return res.status(201).json(insertedLog);

  } catch {
        console.log("Error, something is wrong with respond object.");
        res.status(404);
        res.send({ error: "Error, something is wrong with respond object." });
  }
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

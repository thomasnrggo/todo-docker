const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 6969;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://mongo:27017/todoDB", {})
  .then(() => console.log("App initialized and connected"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

// GET all tasks
app.get("/tasks", async (req, res) => {
  const { completed } = req.query;
  try {
    let query = {};

    if (completed !== undefined) {
      query.completed = query.completed = completed === "true" ? true : false;
    }

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST a new task
app.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task({ title: req.body.title });
    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// PUT (update) an existing task
app.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findById(taskId);
    if (task) {
      task.title = req.body.title;
      task.completed = req.body.completed;
      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// DELETE a task
app.delete("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (task) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

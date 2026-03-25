const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// GET tasks
router.get("/", async (req, res) => {
    const tasks = await Task.find().sort({ created_at: -1 });
    res.json(tasks);
});

// CREATE task
router.post("/", async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json({ error: "Title required" });
    }
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});

// UPDATE (edit + toggle)
router.put("/:id", async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (req.body.title !== undefined) task.title = req.body.title;
    if (req.body.description !== undefined) task.description = req.body.description;
    if (req.body.status !== undefined) task.status = req.body.status;

    await task.save();
    res.json(task);
});

// DELETE
router.delete("/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;
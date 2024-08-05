const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config(".env");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Create a new task
router.post('/', async (req, res) => {
    try {
        const { title, description, dueDate, status, userId } = req.body;
        const count = await Task.countDocuments();
        const ID = count + 1;
        const newTask = new Task({ID, title, description, dueDate, status, userId });
        await newTask.save();
        res.status(200).json(newTask);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('userId', 'name');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findOne({ ID: req.params.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, description, dueDate, status, userId } = req.body;
        const task = await Task.findOneAndUpdate({ ID: req.params.id }, { title, description, dueDate, status, userId }, { new: true });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ ID: req.params.id });
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

async function run(prompt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    //   const prompt = "Write a story about a magic backpack."

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return text;
}

router.post("/generate", async (req, res) => {
    try {
        const { prompt } = req.body;
        const gen = await run("Create a concise task description of upto 50 words for topic named:" + prompt +". Imagine this task is for a task management tool. Focus on the core action and other important things within the task. Make sure to add no styling such as * for bold.");
        res.status(200).json(gen);
    } catch (err) {
        console.error("Error generating text:", err);
        res.status(500).json({ error: "Error generating text. Please check logs for details." });
    }
});

module.exports = router;



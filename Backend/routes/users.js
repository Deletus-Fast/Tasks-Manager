const express = require('express');
const router = express.Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken');

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { name, password, role } = req.body;
        //find the number of users and increment by 1
        const count = await user.countDocuments();
        const ID = count + 1;
        // const u = user.findOne({name:name});
        // if(u) return res.status(400).json({message: 'User already exists'});
        const newUser = new user({ID, name, password, role });
        await newUser.save();
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await user.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const User = await user.findOne({ ID: req.params.id });
        if (!User) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(User);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { name, password, role } = req.body;
        const User = await user.findOneAndUpdate({ ID: req.params.id }, { name, password, role }, { new: true });
        if (!User) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(User);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const User = await user.findOneAndDelete({ ID: req.params.id });
        if (!User) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const User = await user.findOne({ name });
        if (!User) return res.status(404).json({ message: 'User not found' });
        const isMatch = password === User.password;
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
        const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
        console.log(token);
        console.log(User);
        res.status(200).json({ token:token, user: User });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
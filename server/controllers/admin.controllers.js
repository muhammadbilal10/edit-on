//const User = require('../models/User');
const User = require("../models/user.model")
const VideoModel = require('../models/video.model');
// Get all users by userType
const getUsersByType = async (req, res) => {
  try {
     const { type } = req.query;
    const users = await User.find({ userType: type });
    // console.log(users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Create a new user
const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndUpdate(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

const deleteVideos= async (req,res)=>{
   
        const { userId, videoId } = req.params;
        try {
          const user = await User.findById(userId);
        
          if (!user) return res.status(404).json({ error: 'User not found' });
          console.log(user.myVideos)
          const videoIndex = user.myVideos.findIndex(id => id === videoId);
          if (videoIndex === -1) return res.status(404).json({ error: 'Video not found in MyVideos' });
      
          user.myVideos.splice(videoIndex, 1);
          await user.save();
      
          await VideoModel.findByIdAndDelete(videoId);
      
          return res.status(200).json({ result: 'Video deleted successfully' });
        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
      
}

module.exports = {
    getUsersByType,
    createUser,
    updateUser,
    deleteUser,
    deleteVideos
}
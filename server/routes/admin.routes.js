const express = require('express');
const router = express.Router();
const { getUsersByType, createUser,updateUser, deleteUser,deleteVideos} = require('../controllers/admin.controllers');

// Get all users by userType
router.get('/', getUsersByType);

// Create a new user
router.post('/', createUser);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

router.delete('/deleteVideos/:userId/:videoId',deleteVideos)

module.exports = router;

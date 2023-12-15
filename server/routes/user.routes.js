const express = require("express");
const {
  registerController,
  loginController,
  getUserVideos,
  updateUserTestResult,
} = require("../controllers/users.controllers");
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.get("/userVideos/:userId", getUserVideos);

//UPDATE USER TEST RESULT || PUT
router.put("/updateTestResult/:id", updateUserTestResult);

module.exports = router;

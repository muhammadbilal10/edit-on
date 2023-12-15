const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const registerController = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (password.length < 6) {
      return res.send({ message: "Password should have 6 characters" });
    }
    if (!confirmPassword) {
      return res.send({ message: "confirmPassword is Required" });
    }
    if (password !== confirmPassword) {
      return res.send({ message: "password and confirmPassword should match" });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Generate a verification token
    const verificationToken = crypto.randomBytes(16).toString("hex");
    const mailOptions = {
      from: "fyp2batch19@gmail.com",
      to: email,
      subject: "Email Verification",
      text: `Click on the following link to verify your email: http://localhost:5173/verify/${verificationToken}`,
    };

    // Send a verification email to the user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true, // true for 465, false for other ports
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: "fyp2batch19@gmail.com",
        pass: "kvoy xrip zamm rihn",
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error(error);
        // Handle the error (e.g., return an error response)
        return res.status(500).send({
          success: false,
          message: "Error sending verification email",
        });
      } else {
        console.log("Verification email sent: " + info.response);

        // Save user data in the database
        const user = await new userModel({
          name,
          email,
          password: hashedPassword,
          confirmPassword: hashedConfirmPassword,
          verificationToken,
        }).save();

        // Send success response after email is sent and data is stored
        res.status(201).send({
          success: true,
          message:
            "User Register Successfully. Please check your email for verification instructions. ",
          user,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    // Check if the user's email is verified
    if (!user.isEmailVerified) {
      return res.status(403).send({
        success: false,
        message:
          "Email is not verified. Please check your email for verification instructions.",
      });
    }
    // Check if the user is a creator and if they passed the test
    console.log(user.userType);
    if (user.userType === "creator" && user.testResult !== "pass") {
      return res.status(403).send({
        success: false,
        message:
          "You are not allowed to login. Please try again after 3 months.",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // if (user.userType === 'client') {
    //   // Redirect the client to the main client dashboard
    //   res.redirect('/client-dashboard'); // Replace with the actual client dashboard route
    // } else if (user.userType === 'creator') {
    //   // Redirect the creator to the main creator dashboard
    //   res.redirect('/creator-dashboard'); // Replace with the actual creator dashboard route
    // }

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        userType: user.userType,
        rankLevel: user.rankLevel,
        phone: user.phone,
        profession: user.profession,
        myVideos: user.myVideos,
        userType: user.userType,
        language: user.language,
        city: user.city,
        country: user.country,
        testResult: user.testResult,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const getUserVideos = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    userVideos = user.myVideos;
    res.status(200).send({ userVideos });
  } catch (error) {
    res.status(404).send({ message: "error occured" });
  }
};

const updateUserTestResult = async (req, res) => {
  try {
    const email = req.params.id;
    const { testResult } = req.body;
    console.log("hello test body");
    console.log(`test body :${req.body}`);
    console.log(testResult);

    // Find the user by id
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Update the test result and increment the attempts
    user.testResult = testResult;
    user.attempts += 1;
    user.rankLevel = "1";

    // Save the updated user
    await user.save();

    res
      .status(200)
      .send({ message: "User test result updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "An error occurred while updating the user test result",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  getUserVideos,
  updateUserTestResult,
};

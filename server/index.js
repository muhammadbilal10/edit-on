require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const authRoutes = require("./routes/user.routes");
const PORT = 4943;
const videoRouter = require("./routes/video.routes");
const compression = require("compression");
const userModel = require("./models/user.model");
const Video = require("./models/video.model");
const userRoutes = require("./routes/admin.routes");
const app = express();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

app.use(compression());

app.use(morgan("dev"));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Set up multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
// Handle image upload

const fs = require("fs"); // Import the 'fs' module

app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello From  EditON");
});
//videos api
app.use("/", videoRouter);

// admin manages users
app.use("/api/users", userRoutes);

// Create a new endpoint in your routes for email verification
app.get("/verify/:token", async (req, res) => {
  const verificationToken = req.params.token;
  console.log(verificationToken);
  try {
    const user = await userModel.findOne({ verificationToken });
    if (!user) {
      return res.status(404).send({ message: "Invalid verification token" });
    }

    // Mark the email as verified in the user document
    user.isEmailVerified = true;
    user.verificationToken = undefined; // Clear the verification token
    await user.save();

    // Redirect the user to a page
    // You can also send a JSON response if you prefer
    //res.redirect('http://localhost:5173/completeRegistration');
    res.status(200).send({
      success: true,
      message: "Email verified Successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error verifying email", error });
  }
});

// app.post('/completeRegistration', async (req, res) => {
//   try {
//     // Extract data from the request body, including userType
//     const { name, country, email, state, city, language, terms_conditions, userType } = req.body;

//     // Define the update operation
//     const update = {
//       $set: {
//         name,
//         country,
//         state,
//         city,
//         language,
//         terms_conditions,
//         userType,
//       },
//     };

//     // Find the user by email and update their document
//     const result = await userModel.findOneAndUpdate({ email }, update, { new: true });

//     if (!result) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Send a success response
//     res.status(200).json({ message: 'User Registration Completed!', updatedUser: result });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// Update the route to handle both profile upload and registration
app.post("/completeRegistration", upload.single("image"), async (req, res) => {
  try {
    // Extract data from the request body, including userType
    const {
      country,
      email,
      state,
      city,
      language,
      terms_conditions,
      userType,
      companyName,
      companyRegistrationNumber,
    } = req.body;
    console.log(req.body);
    // Create a temporary file to store the uploaded profile image
    const tempFilePath = "./temp-upload.png"; // Choose a temporary file path

    // Write the buffer data to the temporary file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Upload the profile image to Cloudinary
    const imageUploadResult = await cloudinary.uploader.upload(tempFilePath, {
      folder: "profile-pictures",
    });

    // Delete the temporary file after uploading to Cloudinary
    fs.unlinkSync(tempFilePath);

    //Define the update operation
    const update = {
      $set: {
        country,
        state,
        city,
        language,
        terms_conditions,
        userType,
        imageUrl: imageUploadResult.secure_url, // Add the profile image URL
      },
    };
    // If the user is a company, add company-specific fields to the userData
    // if (userType === "company") {
    //   userData.companyName = companyName;
    //   userData.companyRegistrationNumber = companyRegistrationNumber;
    // }
    // Find the user by email and update their document
    const result = await userModel.findOneAndUpdate({ email }, update, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a success response
    res
      .status(200)
      .json({ message: "User Registration Completed!", updatedUser: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//.....get all creators....
app.get("/getCreators", async (req, res) => {
  try {
    const creators = await userModel.find({ userType: "creator" });

    res.status(200).json(creators);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//...............get specific creater videos..........

// Define the API endpoint to get creator video data
app.get("/api/:userId/videos", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate their video data
    const user = await userModel.findById(userId).populate("myVideos");

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const videos = await Video.find({ _id: { $in: user.myVideos } });

    const userData = {
      videos: videos.map((video) => ({
        title: video.title,
        video: video.video,
        thumbnail: video.thumbnail,
        date: video.date,
      })),
    };

    return res.json(userData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//..........................UPDATE PROFILE........................
app.get("/getUserdata/:userId", async (req, res) => {
  try {
    const _id = req.params.userId;

    // Use the findById method to find the user by ID
    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data in the response
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user profile
app.put("/updateProfile/:userId", async (req, res) => {
  try {
    const _id = req.params.userId;
    // Extract data from the request body, including userType
    const {
      name,
      country,
      email,
      state,
      city,
      language,
      terms_conditions,
      userType,
      companyName,
      companyRegistrationNumber,
    } = req.body;

    // Define the update operation
    const update = {
      $set: {
        name,
        country,
        state,
        city,
        language,
        terms_conditions,
        userType,
      },
    };

    // If the user is a company, add company-specific fields to the update operation
    // if (userType === 'company') {
    //   update.$set.companyName = companyName;
    //   update.$set.companyRegistrationNumber = companyRegistrationNumber;
    // }

    // Find the user by userId and update their document
    const result = await userModel.findByIdAndUpdate(_id, update, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send a success response
    res
      .status(200)
      .json({ message: "User Profile Updated!", updatedUser: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//.............................
//...............get all users with thier videos.............
// Define the API endpoint to get all users with their video data

app.get("/usersVideos", async (req, res) => {
  try {
    // Find all users
    const users = await userModel.find();

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    const userData = users.map(async (user) => {
      const videos = await Video.find({ _id: { $in: user.myVideos } });

      return {
        name: user.name,
        id: user._id,
        videos: videos.map((video) => ({
          title: video.title,
          video: video.video,
          thumbnail: video.thumbnail,
          date: video.date,
          id: video._id,
        })),
      };
    });

    // Wait for all user data to be retrieved
    const allUserData = await Promise.all(userData);

    return res.json(allUserData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//........profile upload...........

app.post("/profileUpload", upload.single("image"), async (req, res) => {
  try {
    // Create a temporary file to store the uploaded image
    const tempFilePath = "./temp-upload.png"; // Choose a temporary file path

    // Write the buffer data to the temporary file
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Use the path of the temporary file to upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "profile-pictures",
    });

    // Delete the temporary file after uploading to Cloudinary
    fs.unlinkSync(tempFilePath);

    // Save the uploaded image URL to MongoDB
    const newProfile = new userModel({
      imageUrl: result.secure_url,
    });

    await newProfile.save();

    res.status(201).json({ message: "Profile picture uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//......................hire me payment method..........
const stripe = require("stripe")(
  "sk_test_51NtQpDChIo3FdsTbcDAbV6QNvtJwstU0ZVZyjUrDYldj6HIiOJdEd0yJMxYj5CC8He9rPoUYB2qv8aBZ7KQ4TJ7D00uqPn08s7"
);

// Create Mongoose models
const Order = mongoose.model("Hiring Payments", {
  creatorName: String, // Creator name
  email: String,
  price: Number,
});

const handlePayment = async (req, res) => {
  try {
    const { id, amount, orders } = req.body;
    console.log(req.body);
    // Parse orders array from JSON string
    const parsedOrders = JSON.parse(orders);

    if (
      !parsedOrders ||
      parsedOrders.length === 0 ||
      parsedOrders.some(
        (order) => !order.price || !order.email || !order.creatorName
      )
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      description: "Orders Payment",
      payment_method_types: ["card"],
      payment_method_data: {
        type: "card",
        card: {
          token: id,
        },
      },
      confirm: true,
    });

    console.log(paymentIntent);

    // Save order details to the database using the Order model
    const orderDocs = await Order.create(parsedOrders);

    // Remove ordered products from the database by creator name using the Product model
    // const creatorNames = parsedOrders.map(order => order.productName);
    // await Product.deleteMany({ name: { $in: creatorNames } });

    res.json({ message: "Payment successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Payment failed" });
  }
};

app.post("/api/payment", handlePayment);

/////skill test...............
app.put("/api/usertest/:id", async (req, res) => {
  const userId = req.params.id;
  const { testResult, attempts } = req.body;

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.testResult = testResult;
    user.attempts = attempts;

    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/usertest/:id/testResult", async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await userModel.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ result: user.testResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

//............end.................. testskill.........
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
      console.log("Connected to DataBase");
    })
  )
  .catch((err) => console.log(err.message));

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,

      unique: true,
    },
    // phone: {
    //     type: Number,
    //     required: true,
    // },
    country: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    language: {
      type: String,
    },
    terms_conditions: {
      type: Boolean,
    },
    userType: {
      type: String,
    },
    testResult: {
      type: String,
      default: null,
    },
    rankLevel: {
      type: String,
      default: "0",
    },
    attempts: {
      type: Number,
      default: 2,
    },
    password: {
      type: String,
    },
    confirmPassword: {
      type: String,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    myVideos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const UserModel = mongoose.model("Users", UserSchema);
module.exports = UserModel;

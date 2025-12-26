const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    skillsHave: [
      {
        skill: String,
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
        },
      },
    ],
    skillsWant: [
      {
        skill: String,
        priority: {
          type: Number,
          min: 1,
          max: 5,
        },
      },
    ],
    trustScore: {
      type: Number,
      default: 3.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

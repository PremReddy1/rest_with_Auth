const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
 
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

module.exports = mongoose.model("Users", userSchema);

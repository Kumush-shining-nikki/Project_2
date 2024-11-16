const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userId: Number,
    Firstname: String,
    Lastname: String,
    Username: String,
    Language: String,
    Phone_number: String,
    ChatId: Number,
    Role: {
      type: Boolean,
      default: false
    },
    CreatedAt: Date
  });
          
  const User = mongoose.model('User', userSchema);
  module.exports = User;
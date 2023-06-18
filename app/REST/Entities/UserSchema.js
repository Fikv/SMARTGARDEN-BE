import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastLogonDate: {
      type: Date,
      default: null,
    },
    dateOfCreation: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      required: true,
    },
  });
  
  export const User = mongoose.model('User', userSchema);
  
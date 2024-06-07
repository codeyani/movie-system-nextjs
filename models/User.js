// models/User.js
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: { 
    type: String,
    required: [true, 'Name is required!'],
  },
  email: {
    type: String, 
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
  },
});

const User = models.User || model("User", UserSchema);

export default User;
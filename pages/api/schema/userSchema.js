
// models/User.js

import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique: true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  company:{
    type:String,
    required:true
  },
  profilePhoto:{
    type: String,
    default:""
  },
  TotalTransactions:{
    type: Number,
    default:0,
    unique:true
  }
},{timestamps:true})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema)
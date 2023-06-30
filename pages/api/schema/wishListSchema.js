
// models/User.js

import mongoose from 'mongoose'

const wishListSchema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  companyName:{
    type:String,
    required:true
  },
  nft:{
    type: Object,
    default:{}
  }
},{timestamps:true})

module.exports = mongoose.models.WishList || mongoose.model('WishList', wishListSchema)
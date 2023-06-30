
// models/User.js

import mongoose from 'mongoose'

const TransactionScehma = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  Transaction:{
    type:Object,
    required:true
  },
  companyName:{
    type:String,
    required:true
  },
  TypeOfTransaction:{
    type:String,
    required:true
  },
  tokenURI:{
    type:String,
    required:true
  }
},{timestamps:true})

module.exports = mongoose.models.Transaction || mongoose.model('Transaction', TransactionScehma)
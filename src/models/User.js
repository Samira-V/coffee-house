const mongoose = require("mongoose")
const Schema =new mongoose.Schema({
 name:{
    type:String,
    required:true,
 },
  name:{
    type:String,
    required:true,
 },
  phone:{
    type:String,
    required:true,
 },
  password:{
    type:String,
    required:false,
 },
  email:{
    type:String,
    required:false,
 },
   role:{
    type:String,
    default:'USER'
 },
 refreshToken:String
})

const model = mongoose.models.User || mongoose.model('User',Schema)
module.exports = model
import mongoose from "mongoose"
import connectDb from "../middleware/DataBaseConnection"
import User from '../schema/userSchema'

const handler= async (req, res)=> {
    const AlreadyUser = await User.findOne({username:req.body.username})
    if (AlreadyUser) {
       return res.status(403).json({success:false,message:"This User is Already Registered"})
    }
    const user = await User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        company:req.body.company,
    })
    const savedUser = await user.save()
    if (!savedUser) {
      return  res.status(400).json({success:false,message:"Internal Server Error in Registration"})
    }
    res.status(200).json({success:true,user:savedUser,message:"Sucessfully Registered"})
}
export default connectDb(handler)
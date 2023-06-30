import connectDb from "../middleware/DataBaseConnection"
import User from '../schema/userSchema'

const handler= async (req, res)=> {
    const AlreadyUser = await User.findOne({username:req.body.username})
    if (!AlreadyUser) {
       return res.status(403).json({success:false,message:"This User is not Registered"})
    }
    else if (AlreadyUser.password == req.body.password) {
       return res.status(200).json({success:true,user:AlreadyUser,message:"Sucessfully Login"}) 
    }
    else{
      return  res.status(400).json({success:false,message:"Internal Server Error in Login"})
    }
}
export default connectDb(handler)
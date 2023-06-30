import connectDb from "../middleware/DataBaseConnection"
import Transaction from '../schema/transactionsSchema'

const handler= async (req, res)=> {
    const transactions = await Transaction.find({companyName:req.body.companyName})
    if (!transactions) {
       return res.status(403).json({success:false,message:"No transaction of this Company"})
    }
    else{
      return  res.status(200).json({success:true,transactions,message:"All transactions"})
    }
}
export default connectDb(handler)
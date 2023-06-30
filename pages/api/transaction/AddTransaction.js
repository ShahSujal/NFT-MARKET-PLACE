import mongoose from "mongoose"
import connectDb from "../middleware/DataBaseConnection"
import Transaction from '../schema/transactionsSchema'

const handler= async (req, res)=> {
    if (!req.body.userId&&!req.body.Transaction) {
       return res.status(403).json({success:false,message:"Not Allow Transaction"})
    }
    const transaction = await Transaction({
        userId:req.body.userId,
        Transaction:req.body.Transaction,
        companyName:req.body.companyName,
        TypeOfTransaction:req.body.TypeOfTransaction,
        tokenURI:req.body.tokenURI
    })
    const transactionUser = await transaction.save()
    if (!transactionUser) {
      return  res.status(400).json({success:false,message:"Internal Server Error in Registration"})
    }
    res.status(200).json({success:true,transaction:transactionUser,message:"Sucessfully"})
}
export default connectDb(handler)
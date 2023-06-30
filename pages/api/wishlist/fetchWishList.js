import connectDb from "../middleware/DataBaseConnection"
import WishList from '../schema/wishListSchema'

const handler= async (req, res)=> {
       
            let wishlistItem = await WishList.find({userId:req.body.userId})
            if (wishlistItem) {
               return res.status(200).json({success:true,wishlist:wishlistItem,message:"Sucessfully Added to Wishlist"})
            } else{
        
            res.status(400).json({success:false,message:"Server Error on  Added to Wishlist"}) 
            }
}
export default connectDb(handler)
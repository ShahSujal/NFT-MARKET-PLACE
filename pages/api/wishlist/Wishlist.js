import connectDb from "../middleware/DataBaseConnection"
import WishList from '../schema/wishListSchema'

const handler= async (req, res)=> {

        const wishlist = await WishList({
            userId:req.body.userId,
            nft:req.body.nft,
            companyName:req.body.companyName,
        })
        try {
            let wishlistItem = await wishlist.save()
            res.status(200).json({success:true,wishlist:wishlistItem,message:"Sucessfully Added to Wishlist"}) 
        } catch (error) {
            res.status(400).json({success:false,message:"Server Error on  Added to Wishlist"}) 
        }
}
export default connectDb(handler)
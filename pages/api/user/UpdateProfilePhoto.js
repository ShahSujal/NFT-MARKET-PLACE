import nextConnect from 'next-connect';
import multer from 'multer';
import User from '../schema/userSchema'
import connectDb from '../middleware/DataBaseConnection';
let filePathName = ''
const upload = multer({
  storage: multer.diskStorage({
    destination: './public/ProfilePhoto/',
    filename: (req, file, cb) => {
        const fileName = Date.now();
        const ChangedName = file.mimetype.replace("image/","")
        filePathName = `${fileName}.${ChangedName}`
        // console.log(file.mimetype.replace("image/",""));
        cb(null, `${fileName}.${ChangedName}`)
    },
  }),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.array('image'));

apiRoute.post(async(req, res) => {
    console.log(req.body);
  const Notuser = await User.findOne({_id:req.body.id})
  if (!Notuser) {
   return res.status(401).json({success:false,message:"Internal Server Error"}); 
    }
    const updatedUser = await User.findOneAndUpdate({_id:req.body.id},{
        profilePhoto: filePathName
    })
  res.status(200).json({ data: 'success', updatedUser});
});


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};

export default connectDb(apiRoute);
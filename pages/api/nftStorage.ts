import formidable from "formidable";
import { readFileSync, unlinkSync } from "fs";
import { NextApiHandler } from "next";
import { File, NFTStorage } from "nft.storage";
import { tmpdir } from "os";

const client = new NFTStorage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDAyYzMwZTRCM0FFQzZGNzcxMDRGODc3NzUyMjk0MzUwMDdCMTc5MzkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDYwNTQ1NTkxNSwibmFtZSI6Ik5mdE1hcmtldFBsYWNlIn0.M58f7HuWGJJSht68NFNh3KvzR8TsuqTZEnFLtGAxcvs' });

const handler: NextApiHandler = async (req, res) => {
  if (req.method != "POST") {
    return res.status(403).json({ error: `Unsupported method ${req.method}` });
  }
  try {
    // Parse req body and save image in /tmp
    const data: any = await new Promise((res, rej) => {
      const form = formidable({ multiples: true, uploadDir: tmpdir() });
      form.parse(req, (err, fields, files) => {
        if (err) rej(err);
        res({ ...fields, ...files });
      });
    });
    // Read image from /tmp
    const {
      filepath,
      originalFilename = "image",
      mimetype = "image",
    } = data.image;
    const buffer = readFileSync(filepath);
    const arraybuffer = Uint8Array.from(buffer).buffer;
    const file = new File([arraybuffer], originalFilename, {
      type: mimetype,
    });
    // Upload data to nft.storage
    const metadata = await client.store({
      name: data.name,
      description: data.description,
      image: file,
      company:data.company,
      type:data.type
    });
    // Delete tmp image
    unlinkSync(filepath);
    // return tokenURI
    res.status(201).json({ uri: metadata.url });
  } catch (e) {
    console.log(e);
    return res.status(400).json(e);
  }
};

// Must disable bodyParser for formidable to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
const Connect = require("../mongodb/index");
const asyncHandler = require("express-async-handler");
const ClientModel = require("../schema/Client");
const ImageModel = require("../schema/images");


module.exports.image_upload = asyncHandler(async (req, res) => {
  await Connect();
  
  try {
    const client = await ClientModel.findOne({ email: req.body.email });

    if (client !== null) {
      const upload = new ImageModel(req.body);
      await upload.save();
      return res.send({ message: "image uploaded", data: upload });
    } else {
      return res.send({ message: "Invalid User ID" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error uploading image", error });
  }
});


module.exports.image_get=asyncHandler(async(req,res)=>{
  Connect()
  const images=await ImageModel.find({})
  return res.send({data:images})
})


module.exports.image_like = asyncHandler(async (req, res) => {
  await Connect();
  const image = await ImageModel.findOne({ _id: req.body.id });

  if (image !== null) {
    const userIndex = image.likes.indexOf(req.body.user);

    if (userIndex === -1) {
      image.likes.push(req.body.user);
      await image.save();
      res.send({ message: "like", data: image });
    } else {
      image.likes.splice(userIndex, 1);
      await image.save();
      res.send({ message: "dislike", data: image });
    }
  } else {
    res.send({ message: "wrong Id" });
  }
});

module.exports.image_delete = asyncHandler(async (req, res) => {
  await Connect();
  
  try {
    const image = await ImageModel.findOne({ _id: req.query.id });

    if (image !== null) {
      await ImageModel.deleteOne({ _id: req.query.id });
      res.send({ message: "image deleted", data: image });
    } else {
      res.send({ message: "wrong Id" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error deleting image", error });
  }
});


const mongoose=require('mongoose')
const ImageSchema = mongoose.Schema({
  url: { type: String, required: true },
  user: { type: mongoose.ObjectId, required: true },
  type:{type:String},
  likes: { type: Array},
  comments: { type: Array},
});
var ImageModel
try {
    ImageModel=mongoose.model("images",ImageSchema)
} catch (error) {
    ImageModel = mongoose.model("images");
}
module.exports=ImageModel
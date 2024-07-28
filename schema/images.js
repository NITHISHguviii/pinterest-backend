const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  title:{type:String},
  url: { type: String},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
  type: { type: String },
  likes: { type: Array },
  comments: { type: Array },
}, { timestamps: true });

var ImageModel;
try {
  ImageModel = mongoose.model('images', ImageSchema);
} catch (error) {
  ImageModel = mongoose.model('images');
}

module.exports = ImageModel;

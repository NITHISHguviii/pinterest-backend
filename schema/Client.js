const mongoose=require('mongoose')
const ClientSchema = mongoose.Schema({
  profile:{type:String},
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  followers:{type:Array},
  following:{type:Array}
});
var ClientModel
try {
    ClientModel=mongoose.model("Client",ClientSchema)
} catch (error) {
    ClientModel = mongoose.model("Client");
}
module.exports=ClientModel
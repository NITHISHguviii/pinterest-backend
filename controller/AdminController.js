const Admin=require('../schema/Admin')
const Client=require('../schema/Client')
const Connect = require("../mongodb/index");
const asyncHandler=require("express-async-handler")
const Token=require('../helpers/token')
const Encode=require('../helpers/encode')
exports.admin_post=asyncHandler(async(req,res)=>{
    Connect()
    const encodes=await Encode.encode(req.body.password)
    console.log(encodes)
    const admin = await Admin.create({email:req.body.email,password:encodes});
    return res.send(admin)
})
exports.admin_login = asyncHandler(async (req, res) => {
  try {
    await Connect();
    const admin = await Admin.findOne({ email: req.body.email });
    
    if (!admin) {
      console.log("User not found with email:", req.body.email);
      return res.send({ message: "User not found" });
    }

    const passwordMatch = await Encode.decode(req.body.password, admin.password);
    
    if (!passwordMatch) {
      console.log("Incorrect password for user:", req.body.email);
      return res.send({ message: "Wrong Password" });
    }

    const token = Token.token(admin.email);
    return res.send({ token: token, message: "Login Success" });
    
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).send({ message: "Something went wrong", error });
  }
});
exports.client_details=asyncHandler(async(req,res)=>{
  Connect()
  const data=await Client.find();
  delete data['password']
  const datasecure=data
  res.send(datasecure)
})
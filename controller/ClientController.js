const Client = require("../schema/Client");
const Connect = require("../mongodb/index");
const asyncHandler = require("express-async-handler");
const Encode = require("../helpers/encode");
const Token=require('../helpers/token')
const ClientModel = require("../schema/Client");
module.exports.client_register = asyncHandler(async (req, res) => {
  Connect();
  const Check = await ClientModel.findOne({ email: req.body.email });
  console.log(Check)
  if(Check===null){
    const encodes = await Encode.encode(req.body.password);
    console.log(encodes);
    req.body.password = encodes;
    const client = await Client.create(req.body);
    client.password="encoded"
    return res.send({message:"User Registered"});
    
  }else{
    return res.send({ message: "email Already Exists" });
  }
  
});
module.exports.client_login=asyncHandler(async(req,res)=>{
  Connect()
  const password = req.query.password;
  console.log(req)
  const client = await ClientModel.findOne({ email: req.query.email });
  if(client!==null){
    console.log(client)
  const check=await Encode.decode(password,client.password)
  if(check){
    const token=Token.token(client.email)
    client.password="restricted"
    return res.send({message:"login success",data:client,token:token})
  }
  else{
    return res.send({message:"Wrong Password"})
  }}else{
    return res.send({message:"user not registered"})
  }
})
module.exports.client_follow = asyncHandler(async (req, res) => {
  await Connect();
  const client = await ClientModel.findOne({ _id: req.body.id });

  if (client !== null) {
    const followerIndex = client.followers.indexOf(req.body.follower);

    if (followerIndex === -1) {
      client.followers.push(req.body.follower);
      await client.save();
      res.send({ message: "followed" });
    } else {
      client.followers.splice(followerIndex, 1);
      await client.save();
      res.send({ message: "unfollowed" });
    }
  } else {
    res.send({ message: "wrong Id" });
  }
});

module.exports.client_delete = asyncHandler(async (req, res) => {
  await Connect();
  const client = await ClientModel.findOne({ _id: req.body.id });

  if (client !== null) {
    await ClientModel.deleteOne({ _id: req.body.id });
    res.send({ message: "client deleted", data: client });
  } else {
    res.send({ message: "wrong Id" });
  }
});
module.exports.client_fetch=asyncHandler(async (req,res)=>{
Connect()
const user=await ClientModel.findOne({_id:req.query.id})
await res.send(user)
})
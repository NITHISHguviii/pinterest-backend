const checking=require('../helpers/token')
exports.admin_check=(req,res,next)=>{
    const BearerHeader=req.headers['authorization']
    if(BearerHeader!==undefined){
    const token = BearerHeader.split(" ");
    const check = checking.validate(token[1])
    console.log(check)
    if (check === "Wrong Token") {
      res.send({ message: "token expired" });
    } else {
    next();
    }
    }else{
        res.send({ message: "token is empty" });
    }
    
}
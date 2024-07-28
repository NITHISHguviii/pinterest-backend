const mongoose=require("mongoose")
const AdminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
        
    },
    password:{
        type:String,
        required:true
        
    }
}, { timestamps: true })
var Admin;
try {
    Admin = mongoose.model("admin", AdminSchema);
} catch (error) {
 Admin = mongoose.model("admin");
}
module.exports=Admin
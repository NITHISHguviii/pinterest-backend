const express=require("express")
const app=express.Router()
const Admincontroller=require("../controller/AdminController")
const admin_middleware=require('../middleware/admincheck')
app.get("/api",(req,res)=>{
    res.send("API is Working")
})
app.post("/api/admin/create",Admincontroller.admin_post)
app.post("/api/admin/login", Admincontroller.admin_login);
app.get('/api/admin/users',admin_middleware.admin_check,Admincontroller.client_details)
module.exports=app
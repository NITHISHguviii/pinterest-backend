const express=require('express')
const app=express.Router()
const image=require('../controller/ImageController')
const token_middleware=require('../middleware/admincheck')
app.post("/api/image/upload",token_middleware.admin_check,image.image_upload)
app.get("/api/image/get",image.image_get)
app.post("/api/image/like",token_middleware.admin_check,image.image_like)
app.delete("/api/image/delete",token_middleware.admin_check,image.image_delete)
module.exports=app
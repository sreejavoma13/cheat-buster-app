const express=require("express")
const router=express.Router()
const usercontroller=require('../controllers/user.controller')
router.get('/search',usercontroller.searchuser)
module.exports=router

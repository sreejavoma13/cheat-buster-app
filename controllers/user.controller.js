const { z }=require("zod")
const express=require("express")
const User=require('../models/user.model')
const searchQuerySchema=z.object({
    email: z.string().email({message:"invalid email"}),
})

exports.searchuser=async(req,res)=>{
    try{
        const validateres=searchQuerySchema.safeParse(req.query);
        if(!validateres.success){
            return res.status(400).json({error:validateres.error.issues[0].message})
        }
        const{email}=validateres.data
        const foundUser=await User.findOne({email:email})
        if(!foundUser){
            return res.status(400).json({message:"not in the list"})
        }
        res.status(200).json(foundUser)
    }catch{
        res.status(500).json({error:"unexpected server error"})
    }
}
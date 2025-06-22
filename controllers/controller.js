import {z} from 'zod'
const validate=z.object({
    email:z.string().email({message:"Invalid email format"}),
    name:z.string()
});

export const searchUser=async (req,res)=>{
    try{
        const validationResult=validate.safeParse(req.query)
        if(!validationResult.success){
            return res.status(400).json({"message":"validation error"})
        }
        const {email}=validationResult.data;
        const {name}=validationResult.data
        const foundUser=await User.findOne({ $or: [{ email:email }, { firstName: name }] })
        if(!foundUser){
            return res.status(400).json({message:"hurray!! your partner not the list"})
        }
        res.status(200).json(foundUser);
    }catch(error){
        res.status(400).json({error:"An unexpected server error"})
    }

}


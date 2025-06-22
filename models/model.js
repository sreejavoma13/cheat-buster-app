import mongoose from 'mongoose'

const Userschema=new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'Plesae Provide this field']
    },
    lastName:{
        type:String,
        required:[true,'Plesae Provide this field']
    },
    email:{
        type:String,
        required:[true,'Plesae Provide this field'],
        unique:true
    },
    age:{
        type:Number,
        required:[true,'Plesae Provide this field']
    },
    city:{
        type:String,
        required:[true,'Plesae Provide this field']
    },
    picture:{
        type:String,
        required:[true,'Plesae Provide this field']
    }

})

const User=mongoose.model('User',Userschema);
export default User
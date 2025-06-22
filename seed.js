import mongoose from 'mongoose'
import axios from 'axios'
import User from './models/model.js'
import dotenv from 'dotenv'
dotenv.config()
const seedDataBase=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlparser:true,
            useUnifiedtopology:true,
        });
        console.log("MongoDB connected"); 
        const usercount=await User.countDocuments();
        if (usercount  >0){
            console.log('Database is already seeded');
            mongoose.disconnect();
            return;
        }
        const response=await axios.get('https://randomuser.me/api/?results=50') 
        const userToseed=response.data.results.map(user=>({
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            age: user.dob.age,
            city: user.location.city,
            picture: user.picture.large
        }));
        await User.insertMany(userToseed)
        console.log("Database seeded successfully");
        

    }
    catch(error){
        console.error(`Error:${error.message}`);
        
    }
    finally{
        mongoose.disconnect()
    }
}
seedDataBase()
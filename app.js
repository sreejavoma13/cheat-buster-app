import express from 'express'
import routes from './routes/routes.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs'
const swaggerDocument = yaml.load('./openapi.yaml');
dotenv.config()
const app=express()
const PORT=process.env.PORT
app.use(express.json())
async function ConnectDb(){
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlparser:true,
            useUnifiedtopology:true,
        })
        console.log("Databas econnected");
        
    }catch(error){
        console.error("connection error",error);
        
    }
}
ConnectDb()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/',routes)

app.listen(PORT,()=>{
    console.log("Server is running on port 3000");
     console.log("Swagger docs available at port 3000");
});
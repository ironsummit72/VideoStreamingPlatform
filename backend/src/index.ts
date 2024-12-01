import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDb from "./utils/connectDb.utils";
import authRouter from './routes/auth.routes'
const app=express();
const port=process.env.PORT || 5001;
connectDb();
app.use(cors(
    {origin:process.env.CORS_ORIGIN}
));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/auth',authRouter)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

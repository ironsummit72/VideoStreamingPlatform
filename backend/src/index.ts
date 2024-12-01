import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./utils/connectDb.utils";
import authRouter from './routes/auth.routes'
import cookieParser from "cookie-parser";   
const app=express();
const port=process.env.PORT || 5001;
connectDb();
app.use(cors(
    {origin:process.env.CORS_ORIGIN}
));
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/auth',authRouter)



app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

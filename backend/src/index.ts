import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connectDb from "./utils/connectDb.utils";
import authRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./middlewares/getCurrentUser.middleware";
import ApiResponse from "./types/express/ApiResponse";
const app = express();
const port = process.env.PORT || 5001;
connectDb();
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRouter);
app.use(getCurrentUser);
app.get('/user/currentuser', (req, res) => {
  const response:ApiResponse={
    success: true,
    message: "success",
    data: req.user
  }
  res.status(200).json(response)
} )


app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

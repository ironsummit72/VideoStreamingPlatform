import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import ApiResponse from "../types/express/ApiResponse";
export async function getCurrentUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.session;
  if (!token) return next();
  try {
    const payload = jsonwebtoken.verify(token, `${process.env.JWT_SECRET_KEY}`) as {
      id: string;
      email: string;
      username: string;
      fullName: string;
    };
    req.user = payload;
    next();
  } catch (error) {
    console.error(error);
    const response: ApiResponse = {
      success: false,
      message: "unauthorized",
      statusCode: 401,
    }
    res.status(401).json(response);
    
  }
}
import { Request, Response } from "express";
import { RequestBodyLogin } from "../types/express/requestBody";
import { loginFormSchemaUsername } from "../validations/form.validation";
import ApiResponse from "../types/express/ApiResponse";
export async function postLogin(req: Request, res: Response) {
  const { email, password, username }: RequestBodyLogin = req.body;
  if (username) {
    const result = loginFormSchemaUsername.safeParse({ username, password });
    if (result.success) {
      console.log("login with username");
    } else {
      console.error(result.error);  
    }
  } else if (email) {
    console.log("login with email");
  } else {
    const response: ApiResponse = {
      success: false,
      message: "username or email is required",
      statusCode: 400,
    }
    res.status(400).json(response);
  }
}
export async function postRegister(req: Request, res: Response) {}

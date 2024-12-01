import { Request, Response } from "express";
import {
  RequestBodyLogin,
  RequestBodyRegister,
} from "../types/express/requestBody";
import {
  loginFormSchemaEmail,
  loginFormSchemaUsername,
  RegisterFormSchema,
} from "../validations/form.validation";

import ApiResponse from "../types/express/ApiResponse";
import UserModel from "../models/user.model";
import { verifyPassword } from "../utils/hashPassword.utils";
import { generateToken } from "../utils/jsonWebToken.util";

export async function postLogin(req: Request, res: Response) {
  const { email, password, username }: RequestBodyLogin = req.body;
  if (username) {
    const validationResult = loginFormSchemaUsername.safeParse({
      username,
      password,
    });
    if (validationResult.success) {
      const user = await UserModel.findOne({
        username: validationResult.data.username,
      });
      if (user) {
        // check password here
        const [salt, hash] = user.password.split(".");
        const isPasswordMatched = verifyPassword(
          validationResult.data.password,
          hash,
          salt
        );
        if (isPasswordMatched) {
          const token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: `${user.firstname} ${user.lastname}`,
          });
          res.cookie("session", token, { httpOnly: true });
          const response: ApiResponse = {
            success: true,
            message: "login success",
            statusCode: 200,
          };
          res.status(200).json(response);
        } else {
          const response: ApiResponse = {
            success: false,
            message: "invalid password",
            statusCode: 400,
          };
          res.status(400).json(response);
        }
      } else {
        const response: ApiResponse = {
          success: false,
          message: "user not found, please register yourself first",
          statusCode: 400,
        };
        res.status(404).json(response);
      }
    } else {
      console.error(validationResult.error);
    }
  } else if (email) {
    const validationResult = loginFormSchemaEmail.safeParse({
      email,
      password,
    });
    if (validationResult.success) {
      const user = await UserModel.findOne({
        email: validationResult.data.email,
      });
      if (user) {
        // check password here
        const [salt, hash] = user.password.split(".");
        const isPasswordMatched = verifyPassword(
          validationResult.data.password,
          hash,
          salt
        );
        if (isPasswordMatched) {
          // send response login success and set cookie
          const token = generateToken({
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: `${user.firstname} ${user.lastname}`,
          });
          res.cookie("session", token, { httpOnly: true });
          const response: ApiResponse = {
            success: true,
            message: "login success",
            statusCode: 200,
          };
          res.status(200).json(response);
        } else {
          const response: ApiResponse = {
            success: false,
            message: "invalid password",
            statusCode: 400,
          };
          res.status(400).json(response);
        }
      } else {
        const response: ApiResponse = {
          success: false,
          message: "user not found, please register yourself first",
          statusCode: 400,
        };
        res.status(404).json(response);
      }
    } else {
      console.error(validationResult.error);
    }
  } else {
    const response: ApiResponse = {
      success: false,
      message: "username or email is required",
      statusCode: 400,
    };
    res.status(400).json(response);
  }
}
export async function postRegister(req: Request, res: Response) {
  const {
    username,
    email,
    firstname,
    lastname,
    password,
    confirmpassword,
  }: RequestBodyRegister = req.body;
  const validationResult = RegisterFormSchema.safeParse({
    username,
    email,
    firstname,
    lastname,
    password,
    confirmpassword,
  });
  if (validationResult.success) {
    const user = await UserModel.findOne({
      username: validationResult.data.username,
    });
    if (user) {
      const response: ApiResponse = {
        success: false,
        message: "user already exists",
        statusCode: 400,
      };
      res.status(400).json(response);
    } else {
      try {
        const user = await UserModel.create({
          username: validationResult.data.username,
          email: validationResult.data.email,
          firstname: validationResult.data.firstname,
          lastname: validationResult.data.lastname,
          password: validationResult.data.password,
        });
        if (user) {
          const response: ApiResponse = {
            success: true,
            message: "user created successfully",
            statusCode: 201,
          };
          res.status(201).json(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    console.error(validationResult.error);
  }
}

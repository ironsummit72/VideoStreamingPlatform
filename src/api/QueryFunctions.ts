import axios from "@/axios/AxiosInstance";
import { loginFormSchemaEmail, loginFormSchemaUsername, RegisterFormSchema } from "@/validations/form.validation";
import { z } from "zod";
export async function postLogin(data: z.infer<typeof loginFormSchemaUsername>|z.infer<typeof loginFormSchemaEmail>) {
  const response = await axios.post("auth/login", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },});
  return response.data;
}
export async function postRegister(data:z.infer<typeof RegisterFormSchema>) {
const response=await axios.post("auth/register",data,{headers:{"Content-Type":"application/x-www-form-urlencoded"}})
return response.data
}


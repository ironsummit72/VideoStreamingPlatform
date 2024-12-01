import axios from "@/axios/AxiosInstance";

export async function postLogin(data: unknown) {
  const response = await axios.post("auth/login", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
}

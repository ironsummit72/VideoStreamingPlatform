import jsonwebtoken from "jsonwebtoken";
const secretKey=process.env.JWT_SECRET_KEY;
const expiresIn=process.env.JWT_EXPIRES_IN;
export function generateToken(payload:object)
{
    return jsonwebtoken.sign(payload,secretKey!,{expiresIn});
}
export function verifyToken(token:string)
{
    return jsonwebtoken.verify(token,secretKey!);
}
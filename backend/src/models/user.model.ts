import mongoose from "mongoose";
import { UserDb } from "../types/db/user";
import { generateHash } from "../utils/hashPassword.utils";
const userSchema=new mongoose.Schema<UserDb>({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    channels:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    }]
});
userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
   // hash password here
    const {salt,hash}=generateHash(this.password);
    this.password=`${salt}.${hash}`;
    next();
})
const UserModel=mongoose.model("User",userSchema);
export default UserModel;
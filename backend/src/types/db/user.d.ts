import mongoose from "mongoose";
export interface UserDb {
 username: string;
 firstname: string;
 lastname: string;
 channels:Array<mongoose.Schema.Types.ObjectId>;
 email: string;
 password: string;
}
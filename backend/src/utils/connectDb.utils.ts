import mongoose from "mongoose";

export default async function connectDb() {
  try {
    const db = await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`);
    console.log("Connected to MongoDB",`${ db.connection.host}:${db.connection.port}`);
  } catch (error) {
    console.log(error);
  }
}

import { connect } from "mongoose";
import { config } from "dotenv";

config()

export const connectToMongo = async () => {
    await connect(process.env.MONGODB_CONNECTION_URL)
}
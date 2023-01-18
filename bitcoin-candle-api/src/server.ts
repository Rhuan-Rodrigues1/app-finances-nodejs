import { app } from "./app";
import { config } from "dotenv";
import { connectToMongo } from "./config/db";
import { connection } from "mongoose";

config()

async function createServer () {

    await connectToMongo()

    const PORT = process.env.PORT || 3000
    
    const server = app.listen(PORT, () => {
        console.log("App running on port " + PORT);
        
    })

    process.on("SIGINT", async () => {
        await connection.close()
        server.close()
        console.log("App server and connection to MongoDB closed");
        
    })

}

createServer()

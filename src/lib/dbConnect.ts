import mongoose from "mongoose"

type ConnectionObject = {
    isConnected?: number // 0 = disconnected, 1 = connected and there can be multiple states
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Using existing connection")
        return
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "", {})
        connection.isConnected = db.connections[0].readyState
        console.log("New connection created")
    } catch (error) {
        console.error("Error connecting to database",error)
        process.exit(1)
    }
}


export default dbConnect
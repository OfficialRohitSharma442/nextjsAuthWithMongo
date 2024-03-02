import mongoose from "mongoose";


export const ConnectDB = async () => {
    try {
        // console.log({ mongourl: process.env.MONGO_URI })
        const response = await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected successfully ")

    } catch (error) {
        console.error("Error occure when connectiog Database", error);
    }
}

ConnectDB();
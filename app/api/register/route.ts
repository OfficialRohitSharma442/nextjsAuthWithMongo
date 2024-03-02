import { NextRequest, NextResponse } from "next/server"
import { ConnectDB } from "../../../dbConfig/db"
import { userModel } from "../../../models/user.models"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";


const Response = ({ obj, status }: any) => {
    return NextResponse.json(obj, {
        status
    })
}
export const POST = async (request: any) => {
    try {
        await ConnectDB();
        const { username, email, password } = await request.json();

        const existUser = await userModel.findOne({ email: email });
        if (existUser) {
            return Response({ obj: { error: "user already exist", success: false }, status: 401 })
        }
        // making 10 round of increption 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        console.log({ user });
        return Response({ obj: { error: null, message: "user register succssfully", success: true }, status: 201 })

    } catch (error: any) {
        return Response({ obj: { error: error.message, success: false }, status: 500 })
    }
}
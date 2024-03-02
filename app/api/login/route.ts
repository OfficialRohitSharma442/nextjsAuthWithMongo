import { NextRequest, NextResponse } from "next/server"
import { ConnectDB } from "../../../dbConfig/db"
import { userModel } from "../../../models/user.models"
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const Response = ({ obj, status }: any) => {
    return NextResponse.json(obj, {
        status
    })
}
export const POST = async (request: any) => {
    try {
        await ConnectDB();
        const { email, password } = await request.json();
        console.log({ email, password })
        console.log("HI")
        // checking user is exting or not
        const existUser = await userModel.findOne({ email: email });
        // if user not exist then returning error
        if (!existUser) {
            return Response({ obj: { error: "user Not exist", success: false }, status: 401 })
        }
        // if user found then compare the password
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) {
            return Response({ obj: { error: null, message: "please check user name and password", success: false }, status: 401 })
        }

        console.log({ isMatch })
        console.log({ existUser })
        //   creating the token
        const token = jwt.sign({ userId: existUser._id }, process.env.SECRECT_KEY!, {
            expiresIn: "1d"
        })

        const res = NextResponse.json({ error: null, message: "user Login succssfully", token, success: true }, {
            status: 200
        })
        // setting the token to clients side
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: false
        })
        res.cookies.set("lund", token)
        return res;
        // return Response({ obj: { error: null, message: "user Login succssfully", token, success: true }, status: 201 }).cookies.set("token", token, {
        // httpOnly: true
        // })

    } catch (error: any) {
        return Response({ obj: { error: error.message, success: false }, status: 500 })
    }
}
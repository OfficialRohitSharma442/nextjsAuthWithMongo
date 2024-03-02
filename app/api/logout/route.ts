import { NextRequest, NextResponse } from "next/server"
import { ConnectDB } from "../../../dbConfig/db"



const Response = ({ obj, status }: any) => {
    return NextResponse.json(obj, {
        status
    })
}
export const GET = async (request: any) => {
    try {
        // await ConnectDB();
        // request.
        const res = Response({ obj: { error: null, message: "user Logout successfully", success: true }, status: 200 });
        res.cookies.delete("token");
        return res;
    } catch (error: any) {
        return Response({ obj: { error: error.message, success: false }, status: 500 })
    }
}
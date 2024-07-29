import { User } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server"

export const GET = async (req:Request, {params} : {params : {userId: string}}) => {
    try {
        connectToDb()
        const userId= params.userId;
        const user = await User.findOne({
            userId
        })
        return NextResponse.json(user, {
            status : 200
        })
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error : error
        }, {
            status : 500
        })
        
    }
}
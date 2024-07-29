import { NextRequest, NextResponse } from "next/server";

export const POST = async(req:NextRequest) => {
    try {
        // const body1 = req.body; // this is of no use
        const body2 = await req.json();

        console.log(req.cookies.getAll());
        
        console.log("body 2" , body2);
        
        return NextResponse.json({
            message : 'success'
        }, {
            status : 200
        })

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {text : 'hii'}, {
                status : 500
            }
        )
        
    }
}
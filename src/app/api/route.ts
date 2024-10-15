import { NextResponse } from "next/server";
export function GET(request: any){
    const user=[{
        name: "sda",
        phone: "9456"
    },
    {
        name: "dfaa",
        phone: "9asd6"
    }];
    return NextResponse.json(user);
}
export function PUT(request: any){
    const user=[{
        name: "da",
        phone: "9456"
    },
    {
        name: "faa",
        phone: "9asd6"
    }];
    return NextResponse.json(user);
}
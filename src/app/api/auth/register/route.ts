import { NextResponse, NextRequest} from "next/server";
const http = require("http");

export async function POST(req: NextRequest,) {
    const { email, username, password } = await req.json();

    const res = await fetch(`${process.env.NEXT_APP_API_URL_LOCAL}/auth/local/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, username: username, password: password }),
    });


    const data  = await res.json();
    return new NextResponse(JSON.stringify(data));
}

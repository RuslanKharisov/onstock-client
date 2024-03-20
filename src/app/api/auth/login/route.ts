import { NextResponse, NextRequest} from "next/server";
const http = require("http");

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password } = await req.json();

    const response  = await fetch(`${process.env.NEXT_APP_API_URL_LOCAL}/auth/local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password: password }),
    });

    const data = await response.json();
    if (data.jwt) {
      // Handle successful authentication
      NextResponse.json({ jwt: data.jwt }, { status: 200 });
    } else {
      // Handle authentication failure      
      NextResponse.json({ 
        message: "Authentication failed" 
    }, { status: 401 });
    }
}

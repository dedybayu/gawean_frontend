import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const origin = request.nextUrl.origin

  const response = NextResponse.redirect(`${origin}/`)

  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  response.cookies.set("user", "", {
    expires: new Date(0),
    path: "/",
  })

  return response
}
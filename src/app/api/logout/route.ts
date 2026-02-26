import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const response = NextResponse.redirect(new URL("/", req.url))

  // Hapus token (httpOnly)
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  // Hapus user
  response.cookies.set("user", "", {
    expires: new Date(0),
    path: "/",
  })

  return response
}
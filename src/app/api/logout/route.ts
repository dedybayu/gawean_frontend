import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { api } from "@/src/lib/axios"

export async function POST() {
  try {
    const cookieStore = await cookies() // ✅ WAJIB await

    const accessToken = cookieStore.get("access_token")?.value
    const refreshToken = cookieStore.get("refresh_token")?.value

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: "Token missing" },
        { status: 401 }
      )
    }

    await api.post(
      "/auth/logout",
      { refresh_token: refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )

    const response = NextResponse.json({ message: "Logout success" })

    response.cookies.delete("access_token")
    response.cookies.delete("refresh_token")

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    )
  }
}
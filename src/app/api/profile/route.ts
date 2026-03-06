import { NextResponse } from "next/server"
import { api } from "@/src/lib/axios"
import { cookies } from "next/headers"
import axios from "axios"

export async function GET() {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("access_token")?.value
  const refreshToken = cookieStore.get("refresh_token")?.value

  if (!accessToken) {
    return NextResponse.json({ message: "Token missing" }, { status: 401 })
  }

  try {
    const response = await api.get("/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return NextResponse.json(response.data)

  } catch (error: unknown) {

    if (axios.isAxiosError(error)) {

      if (error.response?.status === 401 && refreshToken) {

        try {

          type RefreshResponse = {
            access_token: string
          }

          const refreshRes = await api.post<RefreshResponse>("/auth/refresh", {
            refresh_token: refreshToken,
          })

          const newAccessToken = refreshRes.data.access_token

          // update cookie
          cookieStore.set("access_token", newAccessToken, {
            httpOnly: true,
            path: "/",
          })

          // retry request pakai token baru
          const retry = await api.get("/profile", {
            headers: {
              Authorization: `Bearer ${newAccessToken}`,
            },
          })

          return NextResponse.json(retry.data)

        } catch {
          return NextResponse.json(
            { message: "Refresh token invalid" },
            { status: 401 }
          )
        }
      }

      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    )
  }
}
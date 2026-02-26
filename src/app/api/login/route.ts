import { NextResponse } from "next/server"
import { api } from "@/src/lib/axios"
import axios from "axios"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const response = await api.post("/auth/login", body)

    return NextResponse.json(response.data, {
      status: response.status,
    })
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ||
            "Login gagal dari backend",
        },
        {
          status: error.response?.status || 500,
        }
      )
    }

    return NextResponse.json(
      { message: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
import { NextResponse } from "next/server"
import { api } from "@/src/lib/axios"
import axios from "axios"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const response = await api.post("/auth/login", body)

        const { access_token, refresh_token, user } = response.data
        // console.log("Token:", access_token) // Debugging
        // console.log("Refresh Token:", refresh_token) // Debugging
        // console.log("User:", user) // Debugging

        const res = NextResponse.json(
            { message: "Login berhasil" },
            { status: response.status }
        )

        // ✅ Simpan token (secure)
        res.cookies.set("access_token", access_token, {
            httpOnly: true,
            secure: false, // true kalau production
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 15, // 15 menit
        })

        res.cookies.set("refresh_token", refresh_token, {
            httpOnly: true,
            secure: false, // true kalau production
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 hari
        })

        // ✅ Simpan user (bisa dibaca client)
        res.cookies.set(
            "user",
            encodeURIComponent(JSON.stringify(user)), // ⬅️ WAJIB encode
            {
                httpOnly: false,
                // secure: process.env.NODE_ENV === "production",
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 60 * 60 * 24,
            }
        )

        return res
        
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
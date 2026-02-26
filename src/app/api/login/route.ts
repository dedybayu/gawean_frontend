import { NextResponse } from "next/server"
import { api } from "@/src/lib/axios"
import axios from "axios"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const response = await api.post("/auth/login", body)

        const { token, user } = response.data

        const res = NextResponse.json(
            { message: "Login berhasil" },
            { status: response.status }
        )

        // ✅ Simpan token (secure)
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24,
        })

        // ✅ Simpan user (bisa dibaca client)
        res.cookies.set(
            "user",
            encodeURIComponent(JSON.stringify(user)), // ⬅️ WAJIB encode
            {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
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
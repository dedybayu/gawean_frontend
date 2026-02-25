"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    //TODO: Cek token apakah masih aktif

    // Kalau tidak ada token, lempar ke login
    if (!token) {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    router.push("/login")
  }

  const user = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : {}

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body text-center space-y-6">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-base-content/70">
            Sugeng rawuh, <span className="font-semibold">{user?.nama || "User"}</span> 👋
          </p>

          <button
            onClick={handleLogout}
            className="btn btn-error w-full"
          >
            Logout
          </button>

        </div>
      </div>
    </main>
  )
}
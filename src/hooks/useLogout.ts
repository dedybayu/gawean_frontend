"use client"

import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    router.replace("/login")
  }

  return logout
}
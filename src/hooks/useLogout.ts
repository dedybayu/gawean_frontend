"use client"

import { useRouter } from "next/navigation"

export function useLogout() {
  const router = useRouter()

  const logout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.replace("/login")
  }

  return logout
}
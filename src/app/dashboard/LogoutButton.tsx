"use client"

import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
    })

    router.replace("/")
  }

  return (
    <button
      onClick={handleLogout}
      className="btn btn-error w-full"
    >
      Logout
    </button>
  )
}
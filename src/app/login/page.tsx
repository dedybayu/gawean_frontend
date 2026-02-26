"use client"

import LoginForm from "@/src/components/auth/LoginForm"
import { useAuthRedirect } from "@/src/hooks/useAuthRedirect"

export default function Home() {
  useAuthRedirect()

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4 bg-gradient-to-br from-primary/20 to-secondary/20">
      <LoginForm />
    </main>
  )
}
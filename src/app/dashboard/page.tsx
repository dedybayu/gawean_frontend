import LogoutButton from "./LogoutButton"

type User = {
  UserID: number
  name: string
  email: string
  level_code: string
  level_name: string
  profile_picture: string
}

import { headers, cookies } from "next/headers"

async function getProfile(): Promise<User | null> {
  const cookieStore = await cookies()
  const headerList = await headers()

  const host = headerList.get("host")
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"

  const baseUrl = `${protocol}://${host}`

  const res = await fetch(`${baseUrl}/api/profile`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  })

  if (!res.ok) return null

  return res.json()
}

export default async function Home() {
  const user = await getProfile()

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body text-center space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          {user ? (
            <>
              <p className="text-base-content/70">
                Sugeng rawuh,{" "}
                <span className="font-semibold">{user.name}</span> 👋
              </p>

              <div className="text-left text-sm space-y-2 bg-base-200 p-4 rounded-lg">
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Role:</strong> {user.level_name}
                </p>
                <p>
                  <strong>Level Code:</strong> {user.level_code}
                </p>
              </div>
            </>
          ) : (
            <p className="text-error">Gagal mengambil data user</p>
          )}

          <LogoutButton />
        </div>
      </div>
    </main>
  )
}
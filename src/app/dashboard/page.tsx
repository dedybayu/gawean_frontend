import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const cookieStore = await cookies() // ⬅️ WAJIB await

  const userCookie = cookieStore.get("user")?.value

  if (!userCookie) {
    redirect("/login")
  }

  const user = JSON.parse(decodeURIComponent(userCookie))

  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body text-center space-y-6">

          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-base-content/70">
            Sugeng rawuh,{" "}
            <span className="font-semibold">
              {user?.nama || "User"}
            </span> 👋
          </p>

          <form action="/api/logout" method="POST">
            <button className="btn btn-error w-full">
              Logout
            </button>
          </form>

        </div>
      </div>
    </main>
  )
}
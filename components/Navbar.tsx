"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

/* ================================
   TYPE
================================ */
type ThemeMode = "auto" | "light" | "dark"

/* ================================
   COMPONENT
================================ */
export default function Navbar() {
  const [theme, setTheme] = useState<ThemeMode>("auto")
  const [mounted, setMounted] = useState(false)

  /* ---------- APPLY THEME ---------- */
  const applyTheme = (mode: ThemeMode) => {
    if (mode === "auto") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      )
    } else {
      document.documentElement.setAttribute("data-theme", mode)
    }
  }

  /* ---------- LOAD SAVED THEME AFTER MOUNT ---------- */
  useEffect(() => {
    const stored = localStorage.getItem("theme")

    if (stored === "light" || stored === "dark" || stored === "auto") {
      setTheme(stored)
    }

    setMounted(true)
  }, [])

  /* ---------- APPLY THEME WHEN CHANGED ---------- */
  useEffect(() => {
    if (!mounted) return

    applyTheme(theme)
    localStorage.setItem("theme", theme)
  }, [theme, mounted])

  /* ---------- LISTEN SYSTEM CHANGE ---------- */
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")

    const handler = () => {
      if (theme === "auto") applyTheme("auto")
    }

    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [theme])

  /* ---------- TOGGLE THEME ---------- */
  const toggleTheme = () => {
    const next: ThemeMode =
      theme === "auto" ? "light" : theme === "light" ? "dark" : "auto"

    setTheme(next)
  }

  return (
    <div className="drawer">
      <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content">
        <div className="navbar fixed top-0 left-0 w-full z-50 bg-base-100 shadow-sm px-4">

          {/* START */}
          <div className="navbar-start">
            <label
              htmlFor="mobile-drawer"
              className="btn btn-ghost btn-circle lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>

            <span className="btn btn-ghost text-2xl font-extrabold">
              Gawean
            </span>
          </div>

          {/* DESKTOP MENU */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-6 text-lg font-semibold">
              <li><Link href="/#home">Beranda</Link></li>
              <li><Link href="/#features">Fitur Kami</Link></li>
              <li><Link href="/#about">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* END */}
          <div className="navbar-end gap-2">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle"
              title={`Mode: ${theme}`}
            >
              {mounted && <ThemeIcon mode={theme} />}
            </button>

            <Link href="/login">
              <button className="btn btn-primary btn-sm font-semibold hidden sm:inline-flex">
                Mulai
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side z-40">
        <label htmlFor="mobile-drawer" className="drawer-overlay"></label>

        <aside className="menu p-6 w-64 min-h-full bg-base-200 text-base-content">
          <h2 className="text-xl font-bold mb-6">Menu</h2>

          <ul className="space-y-2 text-lg font-semibold">
            <li><Link href="/#home">Beranda</Link></li>
            <li><Link href="/#features">Fitur Kami</Link></li>
            <li><Link href="/#about">Tentang Kami</Link></li>
          </ul>

          <Link href="/login">
            <button className="btn btn-primary mt-6 w-full">
              Mulai
            </button>
          </Link>
        </aside>
      </div>
    </div>
  )
}

/* ================================
   THEME ICON
================================ */
interface ThemeIconProps {
  mode: ThemeMode
}



///IKI
function ThemeIcon({ mode }: ThemeIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`w-6 h-6 transition-all duration-500 ${
        mode === "light"
          ? "rotate-0 scale-110"
          : mode === "dark"
          ? "-rotate-90 scale-110"
          : "animate-pulse"
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {mode === "light" && <circle cx="12" cy="12" r="4" />}

      {mode === "dark" && (
        <path d="M21 12.79A9 9 0 0111.21 3 7 7 0 1019 14.79z" />
      )}

      {mode === "auto" && (
        <text
          x="12"
          y="16"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          className="fill-current"
        >
          A
        </text>
      )}
    </svg>
  )
}
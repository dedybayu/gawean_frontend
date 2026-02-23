"use client"

import { useEffect } from "react"
import SunIcon from "./icons/SunIcon"
import MoonIcon from "./icons/MoonIcon"
import AutoIcon from "./icons/AutoIcon"

/* ================================
   TYPE
================================ */
type ThemeMode = "auto" | "light" | "dark"

interface ModeSidebarProps {
  open: boolean
  onClose: () => void
}

interface ModeButtonProps {
  label: string
  onClick: () => void
  children: React.ReactNode
}

/* ================================
   COMPONENT
================================ */
export default function ModeSidebar({
  open,
  onClose,
}: ModeSidebarProps) {
  /* ---------- APPLY THEME ---------- */
  const applyTheme = (mode: ThemeMode) => {
    if (mode === "auto") {
      const isDark =
        window.matchMedia("(prefers-color-scheme: dark)").matches

      document.documentElement.setAttribute(
        "data-theme",
        isDark ? "dark" : "light"
      )
    } else {
      document.documentElement.setAttribute("data-theme", mode)
    }
  }

  /* ---------- SET THEME ---------- */
  const setTheme = (mode: ThemeMode) => {
    localStorage.setItem("theme", mode)
    applyTheme(mode)
    onClose()
  }

  /* ---------- LOAD SAVED THEME ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "light" || saved === "dark" || saved === "auto") {
      applyTheme(saved)
    } else {
      applyTheme("auto")
    }
  }, [])

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-base-100 z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold mb-6">Appearance</h2>

          <div className="space-y-4">
            <ModeButton label="Light" onClick={() => setTheme("light")}>
              <SunIcon />
            </ModeButton>

            <ModeButton label="Dark" onClick={() => setTheme("dark")}>
              <MoonIcon />
            </ModeButton>

            <ModeButton label="Auto" onClick={() => setTheme("auto")}>
              <AutoIcon />
            </ModeButton>
          </div>
        </div>
      </aside>
    </>
  )
}

/* ================================
   BUTTON
================================ */
function ModeButton({
  label,
  children,
  onClick,
}: ModeButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
      bg-base-200 hover:scale-[1.02] transition"
    >
      {children}
      <span className="font-semibold">{label}</span>
    </button>
  )
}
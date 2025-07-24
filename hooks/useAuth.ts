"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import { authService as AuthService, type AuthUser } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    if (AuthService) {
      AuthService.getCurrentUser().then((user) => {
        setUser(user)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }

    // Listen for auth changes
    if (AuthService) {
      const {
        data: { subscription },
      } = AuthService.onAuthStateChange((user) => {
        setUser(user)
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await AuthService.signIn(email, password)
      const user = await AuthService.getCurrentUser()
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true)
    try {
      await AuthService.signUp(email, password, fullName)
      const user = await AuthService.getCurrentUser()
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await AuthService.signOut()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!user) throw new Error("Not authenticated")

    await AuthService.updateProfile(updates)
    setUser({ ...user, ...updates })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

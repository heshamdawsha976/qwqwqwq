"use client"

import React, { useState, useEffect, createContext, useContext } from "react"
import { authService, type AuthUser } from "@/lib/auth"

interface AuthContextType {
  user: AuthUser | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName?: string) => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<AuthUser>) => Promise<void>
}

// Create the context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial user
    try {
      const currentUser = authService.getCurrentUser()
      setUser(currentUser)
      setLoading(false)
    } catch (error) {
      console.error('Auth error:', error)
      setLoading(false)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      await authService.login(email, password)
      const user = authService.getCurrentUser()
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    setLoading(true)
    try {
      await authService.register(fullName || 'User', email, password)
      const user = authService.getCurrentUser()
      setUser(user)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await authService.logout()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<AuthUser>) => {
    if (!user) throw new Error("Not authenticated")

    await authService.updateProfile(updates)
    setUser({ ...user, ...updates })
  }

  const contextValue: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return React.createElement(
    AuthContext.Provider,
    { value: contextValue },
    children
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { BACKEND_URL } from "../config";

interface UserUrl {
  id: number;
  url: string;
  slug: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: { id: number, email: string, full_name: string, urls: UserUrl[] } | null;
  session: boolean | null;
  isLoading: boolean;
  signin: (credentials: unknown) => Promise<void>;
  signup: (data: unknown) => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within a AuthProvider')
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/profile`, {
          method: 'GET',
          credentials: 'include'
        })

        if (!response.ok) {
          throw new Error('Not authenticated')
        }
        const data = await response.json()
        setUser(data.user)
        // user?.urls.map((url: any) => {
        //   console.log(url)
        // })
        setSession(true)
      }

      catch (error) {
        console.error(error)
        setSession(null)
        setUser(null)
        setIsLoading(false)
      }

      finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signin = async (credentials: any, callbackUrl = '/dashboard') => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      const data = await response.json()

      if (!response.ok) {
        setUser(null)
        throw new Error('Error signing in')
      }

      setUser(data.data)
      setSession(true)
      window.location.href = callbackUrl
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const signup = async (credentials: any, callbackUrl = '/dashboard') => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.data)
        setSession(true)
        window.location.replace(callbackUrl)
      }

      else {
        setSession(null)
      }

    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const signout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Error signing out')
      }
      setUser(null)
      setSession(null)
      window.location.origin
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, signin, signup, signout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

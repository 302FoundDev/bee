/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, ReactNode, useEffect } from "react"
import { BACKEND_URL } from "../constants";

interface UserUrl {
  id: number;
  url: string;
  slug: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface SigninCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  full_name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: { id: number, email: string, first_name: string, last_name: string, urls: UserUrl[] } | null;
  isLoading: boolean;
  signin: (credentials: SigninCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials, callbackUrl?: string) => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/profile`, {
          method: 'GET',
          credentials: 'include'
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        }

        else {
          setUser(null)
        }

      }

      catch (error) {
        console.error('Error fetching user:', error);
        setUser(null)
      }

      finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signin = async (credentials: SigninCredentials) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }

      else {
        setUser(null)
        const error = await response.json();
        throw new Error(error.message || "Failed to sign in");
      }
    }

    catch (error) {
      setIsLoading(false)
      console.error(error)
      throw error
    }

    finally {
      setIsLoading(false)
    }
  }

  const signup = async (credentials: SignupCredentials) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()

        return data.message
      }

      const error = await response.json();
      throw new Error(error.message || "Failed to sign up");
    }

    catch (error) {
      console.error(error)
      throw error
    }

    finally {
      setIsLoading(false)
    }
  }

  const signout = async () => {

    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      })

      if (!response.ok) throw new Error('Error signing out')

      setUser(null)
    }

    catch (error) {
      console.error(error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, signin, signup, signout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

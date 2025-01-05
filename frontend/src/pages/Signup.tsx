/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"
import { LoaderIcon, Sparkles } from "lucide-react"


export const Signup = () => {
  const { user, signup } = useAuth()
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsSigningUp(true)

    const fields = Object.fromEntries(new FormData(event.currentTarget))
    const { first_name, last_name, email, password } = fields as { [key: string]: string }

    try {
      await signup({ first_name, last_name, email, password })
      toast.success(`Welcome to Bee! 🎉`)

      window.location.replace("/dashboard")
    }

    catch (error) {
      toast.error(`Error signing up`)
      console.error(error)
    }

    finally {
      setIsSigningUp(false)
    }
  }

  if (user) {
    return <Navigate to="/dashboard" />
  }

  const commonStyles = "block w-full px-3 py-1.5 text-neutral-900 border border-neutral-200 rounded-md bg-transparent focus:ring-primary-600 focus:border-primary-600 dark:border-neutral-800 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

  return (
    <section>
      <motion.div
        className="flex flex-col items-center justify-center px-6 mx-auto mt-8 lg:mt-24 md:mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "linear" }}
      >
        <Link
          to="/"
          className="flex items-center mb-6 text-3xl transition ease-linear text-neutral-900 hover:opacity-70 dark:text-white"
        >
          <Sparkles className="size-10" />
        </Link>
        <div className="w-full lg:w-[600px] md:w-[600px] bg-transparent border rounded-xl shadow border-neutral-200 dark:border-neutral-800">
          <div className="p-4 space-y-4 lg:p-8 md:space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  className={commonStyles}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  className={commonStyles}
                  placeholder="Full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={commonStyles}
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className={commonStyles}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={commonStyles}
                  required
                />
              </div>

              <Button variant="gradient" type="submit" className="w-full py-2 text-base rounded-full">
                {
                  isSigningUp ?
                    <div className="flex items-center justify-center gap-1">
                      <div className="flex items-center duration-100 text-neutral-500 animate-in fade-in-20 dark:text-neutral-400">
                        <LoaderIcon size={20} className="animate-spin" />
                      </div>
                      <span>
                        Create your account
                      </span>
                    </div> :
                    <span>Create your account</span>
                }
              </Button>

              <p className="text-sm font-light text-transparent0 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

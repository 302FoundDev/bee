/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"


export const Signup = () => {
  const { session, signup } = useAuth()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const fields = Object.fromEntries(new FormData(event.currentTarget))
    const { full_name, email, password } = fields

    await signup({ full_name, email, password })
  }

  if (session) {
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
          <img className="size-12" src="/bee.svg" alt="logo" />
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
                  Full name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="name"
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
                  Your email
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
                  Confirm password
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
              <div className="flex items-center space-x-2">
                <div>
                  <input type="checkbox"
                    id="terms"
                    name="terms"
                    className="w-4 bg-transparent border rounded border-neutral-200 h-14 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-neutral-800 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  />
                </div>
                <div>
                  <label
                    htmlFor="terms"
                    className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="font-medium text-blue-500 hover:underline"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <Button variant="gradient" type="submit" className="w-full py-2 text-base rounded-full">
                Create your account
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

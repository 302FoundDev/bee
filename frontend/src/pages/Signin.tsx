import { useAuth } from "../context/AuthContext"
import { Link, useLocation, } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { toast, Toaster } from "sonner"
import { LoaderIcon, Sparkles } from "lucide-react"
import { useState } from "react"

export const SignIn = () => {
  const { signin } = useAuth()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const location = useLocation()

  interface SigninFields {
    email: string;
    password: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSigningIn(true)

    const formData = new FormData(event.target as HTMLFormElement)

    const fields: SigninFields = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    if (!fields.email || !fields.password) {
      toast.error("Please fill in all fields");

      setIsSigningIn(false)
      return;
    }

    try {
      await signin(fields)
      toast.success(`Welcome back! 🎉`)

      const redirectTo = location.state?.from || "/dashboard";
      window.location.replace(redirectTo)
    }

    catch (error) {
      toast.error(`Error logging in`)
      console.error(error)
    }

    finally {
      setIsSigningIn(false)
    }
  }

  return (
    <section>

      <Toaster />

      <motion.div
        className="flex flex-col items-center justify-center px-6 mx-auto mt-8 lg:mt-24 md:mt-24"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        <Link
          to="/"
          className="flex items-center mb-6 text-3xl font-semibold transition ease-linear text-neutral-900 hover:opacity-70 dark:text-neutral-100"
        >
          <Sparkles className="size-10" />
        </Link>
        <div className="w-full bg-transparent border rounded-xl shadow lg:w-[600px] md:w-[600px] border-neutral-200 dark:border-neutral-800">
          <div className="p-4 space-y-4 lg:p-8 md:space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 lg:text-2xl dark:text-neutral-100">
              Welcome back again! 🎉
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-3 py-1.5 text-neutral-900 border border-neutral-200 rounded-md bg-transparent dark:border-neutral-800 dark:text-neutral-100"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-neutral-900 dark:text-neutral-100"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full px-3 py-1.5 text-neutral-900 border border-neutral-200 rounded-md bg-transparent dark:border-neutral-800 dark:text-neutral-100"
                  required
                />
              </div>

              <Button variant="gradient" type="submit" className="w-full py-2 text-base rounded-full" disabled={isSigningIn}>
                {
                  isSigningIn ?
                    <div className="flex items-center justify-center gap-1">
                      <div className="flex items-center duration-100 text-neutral-500 animate-in fade-in-20 dark:text-neutral-400">
                        <LoaderIcon size={20} className="animate-spin" />
                      </div>
                      <span>
                        Login into your account
                      </span>
                    </div> :
                    <span>Login into your account</span>
                }
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-500 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

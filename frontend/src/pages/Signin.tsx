import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"
import { toast } from "sonner"

export const Signin = () => {
  const { signin } = useAuth()

  interface SigninFields {
    email: string;
    password: string;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)

    const fields: SigninFields = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    try {
      await signin(fields)
      toast.success('Logged in successfully')

      setTimeout(() => {
        window.location.replace('/dashboard')
      }, 2000)
    }

    catch (error) {
      toast.error(`Error logging in: ${error}`)
      console.error(error)
    }
  }

  return (
    <section>
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
          <img className="size-12" src="/bee.svg" alt="logo" />
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
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 border border-gray-300 rounded h-14 bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-blue-500 hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <Button variant="gradient" type="submit" className="w-full py-2 text-base rounded-full">
                Log in to your account
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

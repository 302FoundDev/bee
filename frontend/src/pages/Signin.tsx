import { useAuth } from "../context/AuthContext"
import { Link } from "react-router-dom"
import { Button } from "../components/ui/Button"
import { motion } from "framer-motion"

export const Signin = () => {
  const { signin } = useAuth()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const fields = {
      email: formData.get('email') as string,
      password: formData.get('password') as string
    }

    try {
      await signin(fields)
    }

    catch (error) {
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
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 transition ease-linear hover:opacity-70 dark:text-white"
        >
          <img className="size-12" src="/bee.svg" alt="logo" />
        </Link>
        <div className="w-full bg-transparent border rounded-xl shadow lg:w-[600px] md:w-[600px] border-neutral-200 dark:border-neutral-800">
          <div className="p-4 space-y-4 lg:p-8 md:space-y-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 lg:text-2xl dark:text-white">
              Welcome back again! 🎉
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full px-3 py-1.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full px-3 py-1.5 text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

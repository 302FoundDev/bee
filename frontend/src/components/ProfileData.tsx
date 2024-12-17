/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoSaveOutline } from "react-icons/io5"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import { deleteUser } from "../services/api"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import { ConfirmingDeleteModal } from "./ConfirmingDeleteModal"
import { IoWarning } from "react-icons/io5";


export const UserProfileUpdate = () => {
  const { user } = useAuth()

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault()

    alert("Profile update successfully")
  }

  const handleDelete = async () => {

    setIsDeleting(true)

    try {
      await deleteUser()
      window.location.href = '/signin'
    }

    catch (error) {
      console.error(`Error deleting user: ${error}`)
    } finally {
      setIsDeleting(false)
      setIsConfirmingDelete(false)
    }

  }

  return (
    <motion.div
      className="mt-8 bg-transparent"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "linear" }}
    >
      <div className="px-4 mx-auto space-y-8 max-w-screen-2xl">
        <div className="overflow-hidden bg-transparent border rounded-md shadow border-zinc-300 dark:border-zinc-800 sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-3xl font-semibold leading-6 text-neutral-900 dark:text-white">
              General
            </h2>
            <p className="mt-3 text-sm">
              Modify your personal information:
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="firstName"
                    className="block font-medium dark:text-neutral-200"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="your name here.."
                    autoComplete="given-name"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 border border-zinc-800 bg-transparent rounded-md focus:border-zinc-950"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="lastName"
                    className="block font-medium"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="your lastname here..."
                    autoComplete="family-name"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 border border-zinc-800 bg-transparent rounded-md"
                  />
                </div>

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block font-medium"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder={user?.email}
                    autoComplete="email"
                    className="px-4 py-[5px] w-full lg:w-[800px] mt-1 border border-zinc-800 bg-transparent rounded-md"
                    disabled
                  />
                  <span className="flex items-center gap-1 mt-2 text-sm text-red-500 dark:text-red-400">
                    <IoWarning className="text-red-500" />
                    You can't change your email address
                  </span>
                </div>
              </div>
              <div className="mt-8">
                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="flex items-center gap-2 text-white rounded-md"
                >
                  <IoSaveOutline />
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col px-5 py-5 bg-white border rounded-md shadow border-zinc-300 dark:border-zinc-800 dark:bg-transparent lg:mt-0 sm:mt-28">
          <div>
            <h2 className="text-3xl font-semibold">Account</h2>
            <p className="mt-3 text-sm">
              Update your account settings:
            </p>
          </div>

          <div className="w-full gap-2 mt-8">
            <h4>Delete account:</h4>
            <Button
              variant="base"
              onClick={() => setIsConfirmingDelete(true)}
              className="inline-flex items-center justify-center w-full gap-2 py-2 mx-0 mt-2 text-white bg-red-500 rounded-md hover:bg-red-600 md:w-48 lg:w-48"
            >
              Delete account
            </Button>
          </div>
        </div>
      </div>

      <ConfirmingDeleteModal
        isDeleting={isDeleting}
        isOpen={isConfirmingDelete}
        onClose={() => setIsConfirmingDelete(false)}
        handleDelete={handleDelete}
      />

    </motion.div>
  )
}


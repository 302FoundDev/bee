import { XIcon } from "lucide-react"
import { Transition } from "@headlessui/react"

interface ConfirmingDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  handleDelete: () => void
  isDeleting: boolean
}

export const ConfirmingDeleteModal = ({ isOpen, onClose, handleDelete, isDeleting }: ConfirmingDeleteModalProps) => {
  return (
    <Transition show={isOpen}>
      <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50">
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-full max-w-md p-8 mx-auto bg-white rounded-md shadow-lg">
            <button
              onClick={onClose}
              className="absolute text-gray-400 top-4 right-4 hover:text-gray-500"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Confirm Delete
            </h2>
            <p className="mt-2 text-sm text-center text-gray-700 dark:text-gray-400">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md dark:bg-red-600"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}

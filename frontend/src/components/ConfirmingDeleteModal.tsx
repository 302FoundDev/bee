import { XIcon } from "lucide-react";
import { Transition } from "@headlessui/react";
import Loading from "./Loading";

interface ConfirmingDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleDelete: () => void;
  isDeleting: boolean;
}

export const ConfirmingDeleteModal = ({
  isOpen,
  onClose,
  handleDelete,
  isDeleting,
}: ConfirmingDeleteModalProps) => {
  return (
    <Transition
      show={isOpen}
      enter="transition-opacity ease-linear duration-100"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity ease-linear duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="fixed inset-0 z-10 bg-neutral-950/30 text-neutral-950 dark:text-neutral-100"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-full max-w-md p-8 mx-auto bg-neutral-100 dark:bg-neutral-950 border border-zinc-200 dark:border-zinc-800 rounded-md shadow-lg">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 text-neutral-950 dark:text-neutral-100"
            >
              <XIcon className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white">
              Confirm Delete
            </h2>

            {/* Descripción */}
            <p className="mt-2 text-sm text-center text-gray-700 dark:text-gray-400">
              Are you sure you want to do this action? This action cannot
              be undone.
            </p>

            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-neutral-950 bg-neutral-300 rounded-md dark:bg-neutral-800 dark:text-neutral-100 hover:bg-neutral-400 dark:hover:bg-neutral-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className={`px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 transition ${isDeleting ? "cursor-not-allowed opacity-70" : ""
                  }`}
              >
                {isDeleting ?
                  <div className="flex items-center justify-center space-x-2">
                    <Loading />
                    Delete
                  </div>
                  :
                  "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

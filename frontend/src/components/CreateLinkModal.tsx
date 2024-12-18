import { useState } from "react"
import { motion } from "framer-motion"
import { Rocket, X, GitBranchPlus } from "lucide-react"
import Confetti from 'react-confetti-boom'
import Loading from "./Loading"
import { Button } from "../components/ui/Button"
import { createSlug } from "../services/api"


interface CreateSlugModalProps {
  children: React.ReactNode;
}

export const CreateSlugModal: React.FC<CreateSlugModalProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false);

  if (showConfetti) {
    return <Confetti mode="fall" particleCount={50} colors={['#ff577f', '#ff884b']} />;
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    const url = formData.get('url') as string
    const slug = formData.get('slug') as string
    const description = formData.get('description') as string

    setLoading(true)

    try {
      const response = await createSlug(url, slug, description)
      setShowConfetti(true)
      return response
    }

    catch (error) {
      console.error(error)
    }

    finally {
      setLoading(false)
      setShowConfetti(false)
    }
  }

  return (
    <section className="flex flex-col items-center">

      <Button
        className="inline-flex rounded-lg items-center gap-1.5 border border-neutral-300 dark:border-neutral-800"
        variant="gradient"
        size="md"
        onClick={openModal}
      >
        <GitBranchPlus className="w-5 h-5" />
        {children}
      </Button>

      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-10 bg-neutral-950/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={closeModal}
        >
        </motion.div>
      )}

      {isModalOpen && (
        <motion.div
          className="absolute border mx-auto left-0 right-0 rounded-lg h-[500px] max-w-screen-sm sm:w-auto text-neutral-950 font-medium p-4 bg-white dark:bg-neutral-950/50 border-neutral-300 dark:border-neutral-800 z-20"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h3 className="mx-auto text-lg font-bold text-neutral-700">Create a new link</h3>
            <button onClick={closeModal} type="button">
              <X />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="flex flex-col mb-6 text-[15px] font dark:text-gray-200">
              Destination URL:
              <input
                name="url"
                type="text"
                placeholder="https://example.com"
                className="px-4 py-2 mt-1 bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
              />
            </label>
            <label className="flex flex-col text-[15px] mb-6 dark:text-gray-200">
              Short link (optional):
              <input
                name="slug"
                type="text"
                placeholder="yourCustomLink"
                className="px-4 py-2 mt-1 bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
              />
            </label>

            <label className="text-[15px] dark:text-gray-200">
              Description:
              <textarea
                name="description"
                className="w-full h-20 px-4 py-2 mt-1 overflow-auto bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
                placeholder="Enter a description"
              />
            </label>

            <div className="inline-flex items-end justify-end w-full gap-2 mt-8">
              <Button
                onClick={closeModal}
                variant="base"
                className="w-24 bg-blue-600 border border-neutral-300 dark:border-neutral-800 dark:hover:bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="inline-flex items-center justify-center gap-1 bg-blue-600 border w-28 border-neutral-300 dark:border-neutral-800 dark:hover:bg-transparent"
                variant="base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-1.5">
                    <Loading />
                    Create
                  </div>
                ) : (
                  <>
                    <Rocket />
                    Create
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  )
}

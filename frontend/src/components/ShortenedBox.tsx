import { CreateSlugModal } from "./CreateLinkModal"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import { LinkCards } from "./LinkCards"
import { InputSearch } from "./ui/InputSearch"
import { Toaster } from "sonner"
import { useSlugs } from "./UseSlugs"

export const Links = () => {
  const { user } = useAuth()
  const { handleSearch } = useSlugs()

  const createLink = 'Create link'
  const createNewSlug = 'Create new slug'

  return (
    <main className="w-full px-4 mx-auto text-black max-w-screen-2xl dark:text-white">

      {
        <motion.div
          className="flex flex-col w-full gap-2 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
        >
          <div className="flex items-start justify-between w-full mb-8">

            <InputSearch placeholder="Search slug" onSearch={handleSearch} />

            <div>
              <CreateSlugModal children={createLink} />
            </div>
          </div>

          {
            user?.urls.length === 0 ? (
              <div className="flex flex-col items-center mt-16">
                <div>
                  <img
                    src="/empty-box.svg"
                    className="mx-auto size-14"
                    alt="empty box"
                  />
                  <p className="mt-2 mb-4 opacity-50">No links shortened, yet..</p>
                </div>

                <div>
                  <CreateSlugModal children={createNewSlug} />
                </div>
              </div>
            ) : (
              <>
                <Toaster position="bottom-right" />
                <LinkCards />
              </>
            )
          }
        </motion.div>
      }
    </main>
  )
}

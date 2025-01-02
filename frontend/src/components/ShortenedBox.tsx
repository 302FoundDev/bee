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
    <main className="w-full px-4 mx-auto max-w-screen-2xl">

      {
        <motion.div
          className="flex flex-col w-full gap-2 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
        >
          <div className="flex flex-col items-start justify-between w-full gap-8 mb-8 lg:gap-0 lg:flex-row">

            <InputSearch onSearch={handleSearch} />

            <CreateSlugModal children={createLink} />

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

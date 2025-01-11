import { CreateSlugModal } from "./CreateLinkModal"
import { motion } from "framer-motion"
import { LinkCards } from "./LinkCards"
import { InputSearch } from "./ui/InputSearch"
import { Toaster } from "sonner"
import { useSlugs } from "../hooks/useSearchSlugs"

export const BoxLinks = () => {
  const { handleSearch } = useSlugs()

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
            <CreateSlugModal />
          </div>

          <Toaster position="bottom-right" />
          <LinkCards />

        </motion.div>
      }
    </main>
  )
}

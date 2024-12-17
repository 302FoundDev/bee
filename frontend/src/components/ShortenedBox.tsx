import { CreateSlugModal } from "./CreateLinkModal"
import { motion } from "framer-motion"
import { useAuth } from "../context/AuthContext"
import Loading from "./Loading"
import { LinkCards } from "./LinkCards"
import { InputSearch } from "./ui/InputSearch"
import { useState } from "react"


export const Links = () => {
  const { user, isLoading } = useAuth()
  const [filteredSlugs, setFilteredSlugs] = useState([])

  const handleSearch = (value: string) => {
    const lowercasedValue = value.toLowerCase()
    const filtered = user?.urls.filter(({ slug }) =>
      slug.toLowerCase().includes(lowercasedValue)
    )

    setFilteredSlugs(filtered)
  }

  const createLink = 'Create link'
  const createNewSlug = 'Create new slug'

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
        <p className="mt-2">Loading...</p>
      </div>
    )
  }

  return (
    <main className="w-full px-4 mx-auto text-black max-w-screen-2xl dark:text-white">

      {
        <motion.div
          className="flex flex-col w-full gap-6 mt-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "linear" }}
        >
          <div className="flex items-start justify-between w-full">
            <h1 className="text-xl font-semibold">
              Welcome, <span className="bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">{user?.full_name}</span>
            </h1>

            <div>
              <CreateSlugModal children={createLink} />
            </div>
          </div>

          <div>
            <InputSearch placeholder="Search slug" onSearch={handleSearch} />
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

              <LinkCards />


            )
          }

        </motion.div>
      }
    </main>
  )
}

import { useAuth } from "../context/AuthContext";
import { FRONTEND_URL } from "../config"
import { Copy, Trash2, ExternalLink } from 'lucide-react'
import { IconButton } from "./ui/IconButton";
import { useCopyToClipboard } from "./useCopyToClipboard";
import { useState } from "react";


export const LinkCards = () => {
  const [showDetails, setShowDetails] = useState(false)

  const { user } = useAuth()
  const { CopyToClipboard } = useCopyToClipboard()

  const handleCopy = async (shortenedUrl: string) => {
    await CopyToClipboard(shortenedUrl)
  }

  return (
    <div className="grid items-center justify-center w-full grid-cols-1 gap-5 mx-auto lg:grid-cols-3 md:grid-cols-2">
      {user?.urls?.map(({ slug, url, description, created_at }, index) => {

        return (
          <div key={index} className="w-full max-w-lg p-4 mx-auto border rounded-lg shadow border-neutral-200 dark:border-neutral-800">

            <div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold truncate">https://www.example.com/{slug}</span>

                <div className="flex items-center ml-2 space-x-2">
                  <IconButton className="p-2 transition-all ease-linear rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-300 dark:hover:text-neutral-950" onClick={() => handleCopy(`${FRONTEND_URL}/${slug}`)} variant="ghost" size="icon">
                    <Copy className="w-4 h-4" />
                    <span className="sr-only">Copy URL</span>
                  </IconButton>
                  <IconButton className="p-2 transition-all ease-linear rounded-md dark:bg-red-800 dark:hover:bg-red-900" variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete URL</span>
                  </IconButton>
                </div>
              </div>

              <p className="mt-1 text-sm dark:text-neutral-400 text-neutral-600">
                {url}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button className="transition ease-linear hover:opacity-80" onClick={() => setShowDetails(!showDetails)}>Show details</button>
            </div>

            {showDetails && (
              <div className='mt-5 space-y-3 overflow-hidden transition-all duration-300 ease-in-out bg-transparent'>

                <div>
                  <h3 className="text-sm font-medium">Original URL:</h3>
                  <p className="text-sm break-all text-zinc-600 dark:text-neutral-400">{url}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Redirection URL:</h3>
                  <p className="flex items-center text-sm break-all text-zinc-600 dark:text-neutral-400">
                    {FRONTEND_URL}/{slug}
                    <a href='/'
                      className="ml-1 text-blue-600 dark:text-blue-400"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="sr-only">Open URL</span>
                    </a>
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Description:</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{description || 'No description available'}</p>
                </div>
              </div>
            )}

          </div>
        )

      })}
    </div >
  );
};

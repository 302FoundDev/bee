import { useAuth } from "../context/AuthContext";
import { FRONTEND_URL } from "../config"
import { ChevronDown, ChevronUp, Copy, Trash2, ExternalLink } from 'lucide-react'
import { format, isValid } from 'date-fns'
import { es } from 'date-fns/locale'
import { Button } from "./ui/Button";
import { useState } from "react";


export const LinkCards = () => {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(shortUrl)
  //     toast({
  //       title: "URL copiada",
  //       description: "La URL acortada ha sido copiada al portapapeles.",
  //     })
  //   } catch (err) {
  //     console.error('Error al copiar al portapapeles:', err)
  //     toast({
  //       title: "Error",
  //       description: "No se pudo copiar la URL al portapapeles.",
  //       variant: "destructive",
  //     })
  //   }
  // }

  // const handleDelete = ({ id }) => {
  //   onDelete(id)
  //   toast({
  //     title: "URL eliminada",
  //     description: "La URL acortada ha sido eliminada.",
  //   })
  // }

  return (
    <div className="grid items-center justify-center w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-3">
      {user?.urls?.map(({ slug, url, description, created_at }, index) => {

        return (
          <div key={index} className="w-full max-w-md border rounded-md border-zinc-800">

            <div className="p-4">

              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold truncate">{FRONTEND_URL}/{slug}</span>

                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <Copy className="w-4 h-4" />
                    <span className="sr-only">Copy URL</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                    <span className="sr-only">Delete URL</span>
                  </Button>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {created_at && isValid(created_at)
                  ? `Created at ${format(created_at, 'dd MMMM yyyy HH:mm', { locale: es })}`
                  : 'Creation date not available'}
              </p>
            </div>


            <div className="mt-2 border-t border-zinc-800 dark:border-gray-400" >
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full py-3 text-sm font-medium transition-colors rounded-sm dark:hover:bg-neutral-800 hover:bg-zinc-200"
                onClick={() => { setIsOpen(!isOpen) }}
              >
                {isOpen ? 'Hide description' : 'Show description'}
                {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                <span className="sr-only">Toggle description</span>
              </Button>
            </div>

            <div className={`p-4 space-y-2 bg-transparent transition-all duration-300 ease-in-out overflow-hidden ${isOpen} ? 'max-h-96' : 'max-h-0'}`}>
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

            <div className="flex items-center p-4 text-sm text-gray-600 dark:text-gray-400">
              Click the copy button to use this shortened URL.
            </div>

          </div>
        )

      })}
    </div >
  );
};

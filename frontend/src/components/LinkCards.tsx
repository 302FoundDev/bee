import { FRONTEND_URL } from "../constants";
import { Copy, Trash2, ExternalLink, Check } from "lucide-react";
import { IconButton } from "./ui/IconButton";
import { useState } from "react";
import { useSlugs } from "../hooks/useSearchSlugs";
import { ConfirmingDeleteModal } from "./ConfirmingDeleteModal";
import { useCopy } from "../hooks/useCopySlug";
import { useDeleteSlug } from "../hooks/useDeleteSlug";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export const LinkCards = () => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const { filteredSlugs } = useSlugs();
  const { copyToClipboard } = useCopy();
  const { isDeleting, handleDelete } = useDeleteSlug();
  const { isLoading, user } = useAuth();

  const confirmDelete = () => {
    handleDelete(selectedSlug, () => {
      setIsConfirmingDelete(false);
      setSelectedSlug(null);
    });
  };

  if (isLoading) {
    return (
      <div className="flex mt-18 items-center justify-center h-8 gap-1">
        <Loading />
        <span className="flex items-center justify-center">Loading...</span>
      </div>
    )
  }

  return (
    <section className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {
        user?.urls?.length === 0 ? (
          <div className="flex flex-col items-center mt-16">
            <div>
              <img
                src="/empty-box.svg"
                className="mx-auto size-14"
                alt="empty box"
              />
              <p className="mt-2 mb-4 opacity-50">No links shortened, yet..</p>
            </div>
          </div>
        ) :
          (
            filteredSlugs.length > 0 ? (
              filteredSlugs.map(({ id, url, slug, description }) => (
                <div
                  key={id}
                  className="w-full max-w-lg p-4 mx-auto border rounded-lg shadow border-neutral-200 dark:border-neutral-800"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold truncate">/{slug}</span>

                      <div className="flex items-center ml-2 space-x-2">
                        <IconButton
                          onClick={() =>
                            copyToClipboard(`${FRONTEND_URL}/${slug}`, setSelectedSlug)
                          }
                          className="p-2 transition-all ease-linear rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-300 dark:hover:text-neutral-950"
                          variant="ghost"
                          size="icon"
                        >
                          {selectedSlug === `${FRONTEND_URL}/${slug}` ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                          <span className="sr-only">Copy URL</span>
                        </IconButton>

                        <IconButton
                          className="p-2 transition-all ease-linear bg-red-700 rounded-md text-neutral-100 hover:bg-red-800"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedSlug(slug);
                            setIsConfirmingDelete(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="sr-only">Delete URL</span>
                        </IconButton>
                      </div>
                    </div>

                    <p className="mt-1 text-sm dark:text-neutral-400 text-neutral-600">{url}</p>
                  </div>

                  <div className="mt-5 space-y-3 overflow-hidden transition-all duration-300 ease-in-out bg-transparent">
                    <div>
                      <h3 className="text-sm font-medium">Redirection URL:</h3>
                      <p className="flex items-center text-sm break-all text-zinc-600 dark:text-neutral-400">
                        {FRONTEND_URL}/{slug}
                        <a
                          href={`${FRONTEND_URL}/${slug}`}
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
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {description || "No description available"}
                      </p>
                    </div>
                  </div>

                  <ConfirmingDeleteModal
                    isDeleting={isDeleting}
                    isOpen={isConfirmingDelete}
                    onClose={() => setIsConfirmingDelete(false)}
                    handleDelete={confirmDelete}
                  />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full h-8">
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  No URLs found
                </p>
              </div>
            )
          )
      }
    </section>
  );
};

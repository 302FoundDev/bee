import { FRONTEND_URL } from "../constants";
import { Copy, Trash2, ExternalLink, Check } from "lucide-react";
import { IconButton } from "./ui/IconButton";
import { toast } from "sonner";
import { useState } from "react";
import { useSlugs } from "./UseSlugs";
import { ConfirmingDeleteModal } from "./ConfirmingDeleteModal";
import { deleteSlug } from "../services/api";


export const LinkCards = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null)

  const { filteredSlugs, removeSlug } = useSlugs();

  const handleCopy = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        setCopiedSlug(slug);
        toast.success("Copied to clipboard");

        setTimeout(() => setCopiedSlug(null), 2000);
      })
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };

  const handleDelete = async () => {
    if (!slugToDelete) return;
    setIsDeleting(true);

    try {
      await deleteSlug(slugToDelete);
      toast.success("Slug deleted successfully");

      removeSlug(slugToDelete)
    }

    catch (error) {
      console.error(`Error deleting slug: ${error}`);
      toast.error(`Failed to delete slug`);
    }

    finally {
      setIsDeleting(false);
      setIsConfirmingDelete(false);
      setSlugToDelete(null);
    }
  };

  return (
    <section className="grid w-full grid-cols-1 gap-5 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredSlugs.length > 0 ? (
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
                    onClick={() => handleCopy(`${FRONTEND_URL}/${slug}`)}
                    className="p-2 transition-all ease-linear rounded-md dark:bg-neutral-700 dark:hover:bg-neutral-300 dark:hover:text-neutral-950"
                    variant="ghost"
                    size="icon"
                  >
                    {copiedSlug === `${FRONTEND_URL}/${slug}` ? (
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
                      setSlugToDelete(slug);
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
              handleDelete={handleDelete}
            />

          </div>
        ))
      ) : (
        <div className="flex items-center justify-center w-full h-8">
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            No URLs found
          </p>
        </div>
      )}
    </section>
  );
};

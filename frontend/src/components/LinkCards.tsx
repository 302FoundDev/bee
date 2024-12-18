import { useAuth } from "../context/AuthContext";
import { FRONTEND_URL } from "../config";
import { Copy, Trash2, ExternalLink, Check } from "lucide-react";
import { IconButton } from "./ui/IconButton";
import { toast } from "sonner";
import { useState } from "react";

export const LinkCards = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const { user } = useAuth();

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

  const toggleDetails = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };


  return (
    <div className="grid items-center justify-center w-full grid-cols-1 gap-5 mx-auto lg:grid-cols-3 md:grid-cols-2">

      {/* <Toaster className="overflow-hidden" /> */}

      {user?.urls?.map(({ slug, url, description }, index) => (

        <div
          key={slug}
          className="w-full max-w-lg p-4 mx-auto border rounded-lg shadow border-neutral-200 dark:border-neutral-800"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold truncate">
                {FRONTEND_URL}/{slug}
              </span>

              <div className="flex items-center ml-2 space-x-2">

                { /* Fix the `${FRONTEND_URL}/${slug}` from db */}
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
                  className="p-2 transition-all ease-linear rounded-md dark:bg-red-800 dark:hover:bg-red-900"
                  variant="ghost"
                  size="icon"
                >
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
            <button
              className="transition ease-linear hover:opacity-80"
              onClick={() => toggleDetails(index)}
            >
              {expandedCard === index ? "Hide details" : "Show details"}
            </button>
          </div>

          {expandedCard === index && (
            <div className="mt-5 space-y-3 overflow-hidden transition-all duration-300 ease-in-out bg-transparent">
              <div>
                <h3 className="text-sm font-medium">Original URL:</h3>
                <p className="text-sm break-all text-zinc-600 dark:text-neutral-400">
                  {url}
                </p>
              </div>

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
          )}
        </div>
      ))}
    </div>
  );
};

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, X, GitBranchPlus } from "lucide-react";
import confetti from "canvas-confetti";
import Loading from "./Loading";
import { Button } from "../components/ui/Button";
import { createSlug } from "../services/api";
import { toast } from "sonner";


export const CreateSlugModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const url = formData.get("url") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;

    setLoading(true);

    try {
      const response = await createSlug(url, slug, description);

      if (response) {
        toast.success("Slug created successfully");
        closeModal();

        confetti({
          particleCount: 150,
          spread: 70,
          origin: { x: 0.5, y: 0.6 },
        });

      }
    } catch (error) {
      toast.error(`Failed to create slug: ${error}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="flex flex-col items-center">
      <Button
        className="inline-flex rounded-lg items-center gap-1.5 border border-neutral-300 dark:border-neutral-800"
        variant="gradient"
        size="md"
        onClick={openModal}
      >
        <GitBranchPlus className="w-5 h-5" />
        <span>Create new slug</span>
      </Button>

      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-20 bg-neutral-900/30 dark:bg-neutral-950/80"
              role="dialog"
              aria-modal="true"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={closeModal}
            />

            {/* Modal */}
            <motion.div
              className="absolute border w-full max-w-lg mx-auto z-30 left-0 right-0 rounded-lg text-neutral-950 font-medium p-4 bg-white dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800 shadow-lg"
              initial={{ opacity: 0, y: -50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between mb-12">
                <h3 className="mx-auto text-lg font-bold text-neutral-950 dark:text-neutral-100">
                  Create a new link
                </h3>
                <button onClick={closeModal} type="button">
                  <X />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <label className="flex flex-col mb-6 text-[15px] font dark:text-gray-200">
                  Destination URL*
                  <input
                    name="url"
                    type="text"
                    placeholder="https://x.com"
                    className="px-4 py-2 mt-1 bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
                  />
                </label>
                <label className="flex flex-col text-[15px] mb-6 dark:text-gray-200">
                  Short link
                  <input
                    name="slug"
                    type="text"
                    placeholder="Slug (optional)"
                    className="px-4 py-2 mt-1 bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
                  />
                </label>
                <label className="text-[15px] dark:text-gray-200">
                  Description
                  <textarea
                    name="description"
                    className="w-full h-20 px-4 py-2 mt-1 overflow-auto bg-transparent border rounded-md dark:placeholder:text-neutral-400 border-neutral-300 dark:border-neutral-800"
                    placeholder="Enter a description for your link (optional)"
                  />
                </label>
                <div className="inline-flex items-end justify-end w-full gap-2 mt-8">
                  <Button
                    onClick={closeModal}
                    variant="base"
                    className="w-24 bg-blue-600 hover:bg-blue-700 border border-neutral-300 dark:border-neutral-800"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="inline-flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 border w-28 border-neutral-300 dark:border-neutral-800"
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
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

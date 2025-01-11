import { useState } from "react";
import { toast } from "sonner";
import { deleteSlug } from "../services/api";
import { useSlugs } from "./useSearchSlugs";

export const useDeleteSlug = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeSlug } = useSlugs();

  const handleDelete = async (slug: string | null, onComplete: () => void) => {
    if (!slug) return;

    setIsDeleting(true);

    try {
      await deleteSlug(slug);
      toast.success("Slug deleted successfully");

      removeSlug(slug);
    } catch (error) {
      console.error(`Error deleting slug: ${error}`);
      toast.error("Failed to delete slug");
    } finally {
      setIsDeleting(false);
      onComplete();
    }
  };

  return {
    isDeleting,
    handleDelete,
  };
};

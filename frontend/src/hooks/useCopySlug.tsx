import { toast } from "sonner";

export const useCopy = () => {
  const copyToClipboard = (url: string, setSelectedSlug: (url: string | null) => void) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setSelectedSlug(url);
        toast.success("Copied to clipboard");

        setTimeout(() => setSelectedSlug(null), 2000);
      })
      .catch((err) => {
        console.error("Error copying to clipboard:", err);
        toast.error("Error copying to clipboard");
      });
  };

  return { copyToClipboard };
};

import { useState, useMemo } from "react";
import { useAuth } from "../context/AuthContext";

interface UserUrl {
  id: number;
  slug: string;
  url: string;
  description: string;
}

interface UseSlugsProps {
  filteredSlugs: UserUrl[];
  handleSearch: (term: string) => void;
  removeSlug: (slug: string) => void;
}

export const useSlugs = (): UseSlugsProps => {
  const { user } = useAuth();
  const urls = useMemo(() => user?.urls || [], [user?.urls]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSlugs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? urls.filter((slug) => slug.slug.toLowerCase().includes(term))
      : urls;
  }, [urls, searchTerm]);

  const handleSearch = (term: string) => setSearchTerm(term);

  const removeSlug = (slug: string) => {
    // Remueve el slug tanto de la lista original como de los filtrados
    const index = urls.findIndex((item) => item.slug === slug);
    if (index !== -1) urls.splice(index, 1);
    setSearchTerm("");
  };

  return {
    filteredSlugs,
    handleSearch,
    removeSlug,
  };
};

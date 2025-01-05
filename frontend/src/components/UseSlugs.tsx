import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface UserUrl {
  id: number;
  slug: string;
  url: string;
  description: string;
}

interface UseSlugsProps {
  filteredSlugs: UserUrl[];
  setFilteredSlugs?: React.Dispatch<React.SetStateAction<UserUrl[]>>;
  handleSearch: (value: string) => void;
  removeSlug: (value: string) => void;
}

export const useSlugs = (): UseSlugsProps => {
  const { user } = useAuth();
  const [filteredSlugs, setFilteredSlugs] = useState<UserUrl[]>(user?.urls || []);

  const handleSearch = (value: string) => {
    if (!value.trim()) {
      setFilteredSlugs(user?.urls || []);
      return;
    }

    const lowercasedValue = value.trim().toLowerCase();

    const filtered = user?.urls?.filter((slug) => {
      return slug.slug.toLowerCase().includes(lowercasedValue);
    });

    setFilteredSlugs(filtered || []);
  };

  const removeSlug = (slug: string) => {
    setFilteredSlugs((prevSlugs) =>
      prevSlugs.filter((item) => item.slug !== slug)
    );
  };

  return {
    filteredSlugs,
    handleSearch,
    removeSlug
  };
};

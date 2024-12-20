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
  handleSearch: (value: string) => void;
}

export const useSlugs = (): UseSlugsProps => {
  const { user } = useAuth();

  const [filteredSlugs, setFilteredSlugs] = useState<UserUrl[]>(user?.urls || []);

  const handleSearch = (value: string) => {

    if (!value.trim()) setFilteredSlugs(user?.urls || []);

    const lowercasedValue = value.trim().toLowerCase();

    const filtered = user?.urls?.filter((slug) => {
      const matches = slug.slug.toLowerCase().includes(lowercasedValue);
      return matches;
    });

    console.log(filtered);
    setFilteredSlugs(filtered || []);
  };

  return {
    filteredSlugs,
    handleSearch,
  };
};

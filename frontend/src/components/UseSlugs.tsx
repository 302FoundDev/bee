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

  // Función que maneja la búsqueda
  const handleSearch = (value: string) => {
    // Si no hay texto de búsqueda, mostramos todas las URLs
    if (!value.trim()) {
      setFilteredSlugs(user?.urls || []);
      return;
    }

    // Filtramos las URLs del usuario
    const lowercasedValue = value.trim().toLowerCase();

    const filtered = user?.urls?.filter((slug) => {
      return slug.slug.toLowerCase().includes(lowercasedValue);
    });

    // Actualizamos el estado con las URLs filtradas
    setFilteredSlugs(filtered || []);
  };

  console.log(filteredSlugs);

  return {
    filteredSlugs,
    handleSearch,
  };
};

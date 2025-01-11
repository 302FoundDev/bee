import { Search } from "lucide-react";
import { useState } from "react";

interface InputSearchProps {
  placeholder?: string;
  onSearch: (term: string) => void;
}

export const InputSearch = ({
  placeholder = "Search slug",
  onSearch,
}: InputSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="relative flex items-center w-full max-w-md">
      <Search className="absolute w-5 h-5 mx-2 text-gray-500 dark:text-gray-400" />
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full h-10 px-10 bg-transparent border rounded-md border-zinc-200 dark:border-zinc-800"
      />
    </div>
  );
};

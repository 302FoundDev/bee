import { Search } from "lucide-react"
import { useState } from "react"

interface InputSearchProps {
  placeholder?: string
  onSearch: (term: string) => void
}

export const InputSearch = ({ placeholder = "Search...", onSearch }: InputSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    onSearch(term)
  }

  return (
    <div className="relative flex items-center">
      <Search className="absolute mx-2 text-gray-500 dark:text-gray-400" />
      <input
        type="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full h-10 max-w-md px-10 bg-transparent border rounded-md border-zinc-200 dark:border-zinc-800"
      />
    </div>
  )
}


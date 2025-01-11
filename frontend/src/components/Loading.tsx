import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div className="flex items-center justify-center duration-100 text-neutral-500 animate-in fade-in-20 dark:text-neutral-400">
      <Loader2 size={20} className="animate-spin" />
    </div>
  )
}

export default Loading

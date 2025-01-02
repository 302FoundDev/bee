import { Loader2 } from "lucide-react"

const Loading = () => {
  return (
    <div style={{
      margin: 'auto'
    }} className="flex items-center justify-center w-full duration-100 mt-14 text-neutral-500 animate-in fade-in-20 dark:text-neutral-400">
      <Loader2 size={20} className="animate-spin" />
    </div>
  )
}

export default Loading

import { useCallback } from "react"



export const useCopyToClipboard = () => {
  const CopyToClipboard = useCallback(async (shortenedUrl: string) => {
    try {
      await navigator.clipboard.writeText(shortenedUrl)
      // toast({
      //   title: "Copied to clipboard",
      //   description: "The shortened URL has been copied to the clipboard.",
      // })
      alert("Copied to clipboard")
    }

    catch (err) {
      console.error('Error al copiar al portapapeles:', err)
      // toast({
      //   title: "Error",
      //   description: "No se pudo copiar la URL al portapapeles.",
      //   variant: "destructive",
      // })
      alert("Error copying to clipboard")
    }
  }, [])

  return { CopyToClipboard }
}
